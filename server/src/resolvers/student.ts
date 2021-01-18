import { Student } from "../entities/Student";
import { validateNewStudent } from "../utils/validateNewStudent";
import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { StudentDetailsInput } from "./StudentDetailsInput";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class StudentFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class StudentResponse {
  @Field(() => [StudentFieldError], { nullable: true })
  errors?: StudentFieldError[];

  @Field(() => Student, { nullable: true })
  student?: Student;
}

@Resolver()
export class StudentResolver {
  @Query(() => [Student])
  async allStudents(
    @Arg("coachID") coachID: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null //very first items wont have a cursor so it can be null
  ): Promise<Student[]> {
    const realLimit = Math.min(20, limit);
    const query = getConnection()
      .getRepository(Student)
      .createQueryBuilder("s")
      .where('"assignedCoachID" = :coachID', {
        coachID: coachID,
      })
      .orderBy('"createdAt"', "DESC") //What you want to order the list by
      .take(realLimit);

    if (cursor) {
      query.where('"createdAt" < :cursor', {
        //Based on ordering, thats what you will paginate
        cursor: new Date(parseInt(cursor)),
      });
    }

    return query.getMany();
  }

  @Mutation(() => StudentResponse)
  @UseMiddleware(isAuth)
  async createStudent(
    @Arg("options") options: StudentDetailsInput
  ): Promise<StudentResponse> {
    const errors = validateNewStudent(options);

    if (errors) {
      return { errors };
    }

    let student;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Student)
        .values({
          email: options.email,
          firstName: options.firstName,
          lastName: options.lastName,
          population: options.population,
        })
        .returning("*")
        .execute();
      student = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "This student already exists",
            },
          ],
        };
      }
    }

    return { student };
  }

  @Mutation(() => Boolean)
  async deleteStudent(@Arg("id") id: number): Promise<boolean> {
    await Student.delete(id);
    return true;
  }
}
