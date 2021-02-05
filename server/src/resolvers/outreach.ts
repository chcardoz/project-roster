import { Outreach } from "../entities/Outreach";
import { isCoach } from "../middleware/isCoach";
import { MyContext } from "../types";
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
import { OutreachInput } from "./types/OutreachInput";
import { validateNewOutreach } from "../utils/form-validation/validateNewOutreach";
import { PaginationInput } from "./types/PaginationInput";
import { getNumberOfWeek } from "../utils/getWeekNumber";

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
    @Arg("week") week: number,
    @Arg("options") { limit, cursor, coachID, isCoordinator }: PaginationInput
  ): Promise<PaginatedOutreach> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;
    const query = getConnection()
      .getRepository(Outreach)
      .createQueryBuilder("o");

    if (isCoordinator) {
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

      const outreach = await query.getMany();
      return {
        allOutreach: outreach.slice(0, realLimit),
        hasMore: outreach.length === realLimitPlusOne,
      };
    }

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
          week: getNumberOfWeek(options.outreachDate) - 4,
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
