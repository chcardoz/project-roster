import { Field, InputType } from "type-graphql";

@InputType()
export class StudentDetailsInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  population: string;
}
