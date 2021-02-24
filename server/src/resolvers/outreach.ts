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
}

@Resolver(Outreach)
export class OutreachResolver {
  @Query(() => PaginatedOutreach)
  async allOutreach(
    @Arg("options") { coachID, isCoordinator }: PaginationInput
  ): Promise<PaginatedOutreach> {
    const replacements: any[] = [];

    if (!coachID) {
      return {
        allOutreach: [],
      };
    } else if (!isCoordinator) {
      replacements.push(coachID);
    }

    const outreach = await getConnection().query(
      `
        select o.*
        from outreach o
        ${isCoordinator ? "" : `where  o."coachID" = $1`}
      `,
      replacements
    );

    return {
      allOutreach: outreach,
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
