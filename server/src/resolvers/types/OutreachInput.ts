import { Field, InputType } from "type-graphql";

@InputType()
export class OutreachInput {
  @Field()
  studentID: number;

  @Field()
  outreachDate: string;

  @Field()
  type: string;
}
