import { Outreach } from "../entities/Outreach";
import { isCoach } from "src/middleware/isCoach";
import { MyContext } from "src/types";
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
import { OutreachInput } from "./types/OutreachInput";
import { validateNewOutreach } from "src/utils/validateNewOutreach";

@ObjectType()
class OutreachFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class OutreachResponse {
  @Field(() => [OutreachFieldError], { nullable: true })
  errors?: OutreachFieldError[];

  @Field(() => Outreach, { nullable: true })
  meeting?: Outreach;
}

@ObjectType()
class PaginatedOutreach {
  @Field(() => [Outreach])
  allMeetings: Outreach[];
  @Field()
  hasMore: boolean;
}

@Resolver(Outreach)
export class OutreachResolver {
  //TODO: Getting the meeting details for each coach and using pagination

  @Mutation(() => OutreachResponse)
  @UseMiddleware(isCoach)
  async createMeeting(
    @Arg("options") options: OutreachInput,
    @Ctx() { req }: MyContext
  ): Promise<OutreachResponse> {
    const errors = validateNewOutreach(options);
    if (errors) {
      return { errors };
    }
    let meeting;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Outreach)
        .values({
          studentID: options.studentID,
          coachID: parseInt(req.session.id),
          outreachDate: new Date(parseInt(options.outreachDate)), //TODO: directly sending a date object to the date .maybe?
          type: options.type,
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
    await Outreach.delete(id);
    return true;
  }
}
