import { InputType, Field, Float } from "type-graphql";

@InputType()
export class PaginationInput {
  @Field(() => Float, { nullable: true })
  coachID: number | null;

  @Field(() => Boolean, { nullable: true })
  isCoordinator: boolean | null;
}
