import { Student } from "../entities/Student";
import { validateNewStudent } from "../utils/validateNewStudent";
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
  async allStudents(): Promise<Student[]> {
    const students = await Student.find();
    return students;
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
