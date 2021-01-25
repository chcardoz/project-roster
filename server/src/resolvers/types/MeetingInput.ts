import { Field, InputType } from "type-graphql";

@InputType()
export class MeetingInput {
  @Field()
  studentID: number;

  @Field()
  meetingDate: string;

  @Field()
  duration: number;
}
