import { InputType, Field } from "type-graphql";
@InputType()
export abstract class BaseInput {
  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}
