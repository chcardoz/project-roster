import { Student } from "../entities/Student";
import { validateNewStudent } from "../utils/validateNewStudent";
import {
  Arg,
  Field,
  Float,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { StudentDetailsInput } from "./types/StudentDetailsInput";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class StudentFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

//The data shape when you paginate the student table.
@ObjectType()
class PaginatedStudents {
  @Field(() => [Student])
  allStudents: Student[];
  @Field()
  hasMore: boolean;
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
  @Query(() => PaginatedStudents)
  async allStudents(
    @Arg("population") population: string,
    @Arg("coachID", () => Float, { nullable: true }) coachID: number | null, //The coach id can be null, when no users are logged in
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null //very first items wont have a cursor so it can be null
  ): Promise<PaginatedStudents> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;
    const query = getConnection()
      .getRepository(Student)
      .createQueryBuilder("s");

    //Only care about pagination if a coach id is given
    if (coachID) {
      query
        .where('"assignedCoachID" = :coachID', {
          coachID: coachID,
        })
        .orderBy('"createdAt"', "DESC") //What you want to order the list by
        .take(realLimitPlusOne);

      const test = await query.getMany();
      //TODO: Do not allow pagination for coaches who have no students. It does some weird stuff if you allow that.
      if (cursor && test.length !== 0) {
        query
          .where("population = :population", {
            population,
          })
          .where('"createdAt" < :cursor', {
            //Based on ordering, thats what you will paginate
            cursor: new Date(parseInt(cursor)),
          });
      }

      const students = await query.getMany();
      return {
        allStudents: students.slice(0, realLimit),
        hasMore: students.length === realLimitPlusOne,
      };
    }

    //The same data shape if you entered a coach id who has no students.
    return {
      allStudents: [],
      hasMore: false,
    };
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
