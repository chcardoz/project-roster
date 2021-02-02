import { Outreach } from "../entities/Outreach";
import { isCoach } from "../middleware/isCoach";
import { MyContext } from "../types";
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
import { OutreachInput } from "./types/OutreachInput";
import { validateNewOutreach } from "../utils/form-validation/validateNewOutreach";

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
  outreach?: Outreach;
}

@ObjectType()
class PaginatedOutreach {
  @Field(() => [Outreach])
  allOutreach: Outreach[];
  @Field()
  hasMore: boolean;
}

@Resolver(Outreach)
export class OutreachResolver {
  @Query(() => PaginatedOutreach)
  async allOutreach(
    @Arg("coachID", () => Float, { nullable: true }) coachID: number | null, //The coach id can be null, when no users are logged in
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null, //very first items wont have a cursor so it can be null
    @Ctx() { req }: MyContext
  ): Promise<PaginatedOutreach> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;
    const query = getConnection()
      .getRepository(Outreach)
      .createQueryBuilder("o");

    //Checking to see if a coordinator is asking for the mweeting table, in which case show all meeting
    if (req.session.isCoordinator) {
      query.orderBy('"createdAt"', "DESC").take(realLimitPlusOne);

      if (cursor) {
        query.andWhere('"createdAt" < :cursor', {
          cursor: new Date(parseInt(cursor)),
        });
      }

      const outreach = await query.getMany();
      return {
        allOutreach: outreach.slice(0, realLimit),
        hasMore: outreach.length === realLimitPlusOne,
      };
    }

    //Only care about pagination if a coach id is given
    if (coachID) {
      query
        .where('"assignedCoachID" = :coachID', {
          coachID: coachID,
        })
        .orderBy('"createdAt"', "DESC") //What you want to order the list by
        .take(realLimitPlusOne);

      const test = await query.getMany();

      //Just means that the coach has some students
      if (test.length !== 0) {
        // query.andWhere('"weekNumber" = :week', {
        //   week,
        // });

        if (cursor) {
          query.andWhere('"createdAt" < :cursor', {
            //Based on ordering, thats what you will paginate
            cursor: new Date(parseInt(cursor)),
          });
        }
      }

      const outreach = await query.getMany();
      return {
        allOutreach: outreach.slice(0, realLimit),
        hasMore: outreach.length === realLimitPlusOne,
      };
    }

    //The same data shape if you entered a coach id who has no students.
    return {
      allOutreach: [],
      hasMore: false,
    };
  }

  @Mutation(() => OutreachResponse)
  @UseMiddleware(isCoach)
  async createOutreach(
    @Arg("options") options: OutreachInput,
    @Ctx() { req }: MyContext
  ): Promise<OutreachResponse> {
    const errors = validateNewOutreach(options);
    if (errors) {
      return { errors };
    }
    let outreach;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Outreach)
        .values({
          studentID: options.studentID,
          coachID: req.session.userId,
          outreachDate: new Date(options.outreachDate),
          type: options.type,
        })
        .returning("*")
        .execute();
      outreach = result.raw[0];
    } catch (err) {
      throw new Error(err.message);
    }

    return { outreach };
  }

  @Mutation(() => Boolean)
  async deleteOutreach(@Arg("id") id: number): Promise<boolean> {
    await Outreach.delete(id);
    return true;
  }
}
