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
    const replacements: any[] = [population, realLimitPlusOne];

    if (!options.coachID) {
      return {
        allStudents: [],
        hasMore: false,
      };
    } else if (!options.isCoordinator) {
      replacements.push(options.coachID);
    }

    if (options.cursor) {
      replacements.push(new Date(parseInt(options.cursor)));
    }

    const students = await getConnection().query(
      `
        select s.*
        from student s
        where s."population" = $1
        ${options.isCoordinator ? "" : `and  s."assignedCoachID" = $3`}
        ${options.cursor ? `and s."createdAt" < $4` : ""}
        order by s."createdAt" DESC
        limit $2
      `,
      replacements
    );

    return {
      allStudents: students.slice(0, realLimit),
      hasMore: students.length === realLimitPlusOne,
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
          ...options,
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
