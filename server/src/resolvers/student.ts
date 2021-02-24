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
    @Arg("options") options: PaginationInput
  ): Promise<PaginatedStudents> {
    const replacements: any[] = [];

    if (!options.coachID) {
      return {
        allStudents: [],
      };
    } else if (!options.isCoordinator) {
      replacements.push(options.coachID);
    }

    const students = await getConnection().query(
      `
        select s.*
        from student s
        ${options.isCoordinator ? "" : `where  s."assignedCoachID" = $1`}
      `,
      replacements
    );

    return {
      allStudents: students,
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
