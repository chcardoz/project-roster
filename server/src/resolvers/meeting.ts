import { Meeting } from "../entities/Meeting";
import { isCoach } from "src/middleware/isCoach";
import { MyContext } from "src/types";
import { validateNewMeeting } from "src/utils/validateNewMeeting";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
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

@ObjectType()
class PaginatedMeetings {
  @Field(() => [Meeting])
  allMeetings: Meeting[];
  @Field()
  hasMore: boolean;
}

@Resolver()
export class MeetingResolver {
  //TODO: Getting the meeting details for each coach and using pagination

  @Mutation(() => MeetingResponse)
  @UseMiddleware(isCoach)
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
          meetingDate: new Date(parseInt(options.meetingDate)), //TODO: directly sending a date object to the date .maybe?
          duration: options.duration,
        })
        .returning("*")
        .execute();
      meeting = result.raw[0];
    } catch (err) {
      throw new Error(err.message);
    }

    return { meeting };
  }

  @Mutation(() => Boolean)
  async deleteMeeting(@Arg("id") id: number): Promise<boolean> {
    await Meeting.delete(id);
    return true;
  }
}
