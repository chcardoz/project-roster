import { Field, InputType } from "type-graphql";
import { BaseInput } from "./BaseInput";

@InputType()
export class StudentDetailsInput extends BaseInput {
  @Field()
  population: string;
}
