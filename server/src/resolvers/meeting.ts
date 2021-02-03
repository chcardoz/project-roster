import { Meeting } from "../entities/Meeting";
import { isCoach } from "../middleware/isCoach";
import { MyContext } from "../types";
import { validateNewMeeting } from "../utils/form-validation/validateNewMeeting";
import {
  Arg,
  Ctx,
  Field,
  Float,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { MeetingInput } from "./types/MeetingInput";
import { getNumberOfWeek, getWeekNumber } from "../utils/getWeekNumber";

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
    @Arg("coachID", () => Float, { nullable: true }) coachID: number | null, //The coach id can be null, when no users are logged in
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null, //very first items wont have a cursor so it can be null
    @Ctx() { req }: MyContext
  ): Promise<PaginatedMeetings> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;
    const query = getConnection()
      .getRepository(Meeting)
      .createQueryBuilder("m");

    if (req.session.isCoordinator) {
      query.orderBy('"createdAt"', "DESC").take(realLimitPlusOne);

      if (cursor) {
        query.andWhere('"createdAt" < :cursor', {
          cursor: new Date(parseInt(cursor)),
        });
      }

      const meetings = await query.getMany();
      return {
        allMeetings: meetings.slice(0, realLimit),
        hasMore: meetings.length === realLimitPlusOne,
      };
    }
    if (coachID) {
      query
        .where('"coachID" = :coachID', {
          coachID: coachID,
        })
        .orderBy('"createdAt"', "DESC") //What you want to order the list by
        .take(realLimitPlusOne);

      const test = await query.getMany();
      if (test.length !== 0) {
        query.andWhere("week = :week", {
          week,
        });

        if (cursor) {
          query.andWhere('"createdAt" < :cursor', {
            //Based on ordering, thats what you will paginate
            cursor: new Date(parseInt(cursor)),
          });
        }
      }

      const meetings = await query.getMany();
      return {
        allMeetings: meetings.slice(0, realLimit),
        hasMore: meetings.length === realLimitPlusOne,
      };
    }

    //nobody is asking but this query is being called anyway
    return {
      allMeetings: [],
      hasMore: false,
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
