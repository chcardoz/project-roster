import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Student } from "../entities/Student";
import { isCoordinator } from "../middleware/isCoordinator";
import { validateNewStudent } from "../utils/form-validation/validateNewStudent";
import { PaginationInput } from "./types/PaginationInput";
import { StudentDetailsInput } from "./types/StudentDetailsInput";

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

@Resolver(Student)
export class StudentResolver {
  @Query(() => PaginatedStudents)
  async allStudents(
    @Arg("population") population: string,
    @Arg("options") options: PaginationInput
  ): Promise<PaginatedStudents> {
    const realLimit = Math.min(20, options.limit);
    const realLimitPlusOne = realLimit + 1;
    const query = getConnection()
      .getRepository(Student)
      .createQueryBuilder("s");

    if (options.isCoordinator) {
      query
        .where("population = :population", {
          population,
        })
        .orderBy('"createdAt"', "DESC")
        .take(realLimitPlusOne);
      if (options.cursor) {
        query.andWhere('"createdAt" < :cursor', {
          cursor: new Date(parseInt(options.cursor)),
        });
      }
      const students = await query.getMany();
      return {
        allStudents: students.slice(0, realLimit),
        hasMore: students.length === realLimitPlusOne,
      };
    }
    if (options.coachID) {
      query
        .where('"assignedCoachID" = :coachID', {
          coachID: options.coachID,
        })
        .orderBy('"createdAt"', "DESC")
        .take(realLimitPlusOne);

      const test = await query.getMany();
      if (test.length !== 0) {
        query.andWhere("population = :population", {
          population,
        });
        if (options.cursor) {
          query.andWhere('"createdAt" < :cursor', {
            cursor: new Date(parseInt(options.cursor)),
          });
        }
      }
      const students = await query.getMany();
      return {
        allStudents: students.slice(0, realLimit),
        hasMore: students.length === realLimitPlusOne,
      };
    }
    return {
      allStudents: [],
      hasMore: false,
    };
  }

  @Mutation(() => StudentResponse)
  @UseMiddleware(isCoordinator)
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
