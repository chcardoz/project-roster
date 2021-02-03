import { InputType, Field, Float, Int } from "type-graphql";

@InputType()
export class PaginationInput {
  @Field(() => Float, { nullable: true })
  coachID: number | null;

  @Field(() => Int)
  limit: number;

  @Field(() => String, { nullable: true })
  cursor: string | null;

  @Field(() => Boolean, { nullable: true })
  isCoordinator: boolean | null;
}
