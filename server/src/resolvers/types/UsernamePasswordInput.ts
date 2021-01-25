import { InputType, Field } from "type-graphql";
import { BaseInput } from "./BaseInput";
@InputType()
export class UsernamePasswordInput extends BaseInput {
  @Field()
  username: string;
  @Field()
  password: string;
}
