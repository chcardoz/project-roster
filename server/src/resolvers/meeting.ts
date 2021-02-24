import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Meeting } from "../entities/Meeting";
import { isCoach } from "../middleware/isCoach";
import { MyContext } from "../types";
import { validateNewMeeting } from "../utils/form-validation/validateNewMeeting";
import { getNumberOfWeek } from "../utils/getWeekNumber";
import { MeetingInput } from "./types/MeetingInput";
import { PaginationInput } from "./types/PaginationInput";

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
}

@Resolver(Meeting)
export class MeetingResolver {
  @Query(() => PaginatedMeetings)
  async allMeetings(
    @Arg("options") { isCoordinator, coachID }: PaginationInput
  ): Promise<PaginatedMeetings> {
    const replacements: any[] = [];

    if (!coachID) {
      return {
        allMeetings: [],
      };
    } else if (!isCoordinator) {
      replacements.push(coachID);
    }

    const meetings = await getConnection().query(
      `
        select m.*
        from meeting m
        ${isCoordinator ? "" : `where m."coachID" = $1`}
      `,
      replacements
    );

    return {
      allMeetings: meetings,
    };
  }

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
          coachID: req.session.userId,
          meetingDate: new Date(options.meetingDate),
          duration: options.duration,
          week: getNumberOfWeek(options.meetingDate) - 4,
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
