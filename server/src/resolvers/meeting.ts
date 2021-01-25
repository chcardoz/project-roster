import { Meeting } from "src/entities/Meeting";
import { MyContext } from "src/types";
import { validateNewMeeting } from "src/utils/validateNewMeeting";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { MeetingInput } from "./types/MeetingInput";

@ObjectType()
class MeetingFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class MeetingResponse {
  @Field(() => [MeetingFieldError], { nullable: true })
  errors?: MeetingFieldError[];

  @Field(() => Meeting, { nullable: true })
  meeting?: Meeting;
}

@Resolver()
export class MeetingResolver {
  @Mutation(() => MeetingResponse)
  async createMeeting(
    @Arg("options") options: MeetingInput,
    @Ctx() { req }: MyContext
  ): Promise<MeetingResponse> {
    const errors = validateNewMeeting(options);
    if (errors) {
      return { errors };
    }
    let meeting;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Meeting)
        .values({
          studentID: options.studentID,
          coachID: parseInt(req.session.id),
          meetingDate: options.meetingDate,
          duration: options.duration,
        })
        .returning("*")
        .execute();
      meeting = result.raw[0];
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

    return { meeting };
  }
}
