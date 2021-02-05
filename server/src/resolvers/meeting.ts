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
  @Field()
  hasMore: boolean;
}

@Resolver(Meeting)
export class MeetingResolver {
  @Query(() => PaginatedMeetings)
  async allMeetings(
    @Arg("week") week: number,
    @Arg("options") { limit, cursor, isCoordinator, coachID }: PaginationInput
  ): Promise<PaginatedMeetings> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;
    const replacements: any[] = [week, realLimitPlusOne];

    if (!coachID) {
      return {
        allMeetings: [],
        hasMore: false,
      };
    } else if (!isCoordinator) {
      replacements.push(coachID);
    }
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }
    const meetings = await getConnection().query(
      `
        select m.*
        from meeting m
        where m."week" = $1
        ${isCoordinator ? "" : `and  m."coachID" = $3`}
        ${cursor ? `and m."createdAt" < $4` : ""}
        order by m."createdAt" DESC
        limit $2
      `,
      replacements
    );

    return {
      allMeetings: meetings.slice(0, realLimit),
      hasMore: meetings.length === realLimitPlusOne,
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
