import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
} from "type-graphql";
import { MyContext } from "../types";
import { Coach } from "../entities/Coach";
import argon2 from "argon2";
import {
  COOKIE_NAME,
  COORDINATORS,
  FORGET_PASSWORD_PREFIX,
} from "../constants";
import { UsernamePasswordInput } from "./types/UsernamePasswordInput";
import {
  validateNewPassword,
  validateRegister,
} from "../utils/form-validation/validateRegister";
import { getConnection } from "typeorm";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class CoachResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Coach, { nullable: true })
  coach?: Coach;
}

@Resolver()
export class CoachResolver {
  @Query(() => [Coach])
  async allCoaches(): Promise<Coach[]> {
    const coaches = await Coach.find();
    return coaches;
  }

  @Mutation(() => CoachResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<CoachResponse> {
    const errors = validateNewPassword(newPassword);
    if (errors) {
      return { errors };
    }
    const coachID = await redis.get(FORGET_PASSWORD_PREFIX + token);
    if (!coachID) {
      return {
        errors: [
          {
            field: "token",
            message: "Token has expired",
          },
        ],
      };
    }

    const coach = await Coach.findOne({
      where: {
        id: coachID,
      },
    });

    if (!coach) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }

    await Coach.update(
      { id: parseInt(coachID) },
      { password: await argon2.hash(newPassword) }
    );
    await redis.del(FORGET_PASSWORD_PREFIX + token);
    req.session.userId = coach.id;
    return { coach };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ): Promise<Boolean> {
    const coach = await Coach.findOne({ where: { email: email } });
    if (!coach) {
      return true;
    }

    const userToken = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + userToken,
      coach.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );
    await sendEmail(
      email,
      `<a href='http://localhost:3000/change-password/${userToken}'>Reset password</a>`
    );
    return true;
  }

  @Query(() => Coach, { nullable: true })
  async currentCoach(@Ctx() { req }: MyContext): Promise<Coach | undefined> {
    if (!req.session.userId) {
      return undefined;
    }
    const user = await Coach.findOne({
      where: {
        id: req.session.userId,
      },
    });
    return user;
  }

  @Mutation(() => CoachResponse)
  async registerCoach(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<CoachResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    let isCoordinator = false;
    if (COORDINATORS.includes(options.email)) {
      isCoordinator = true;
    }
    const hashedPassword = await argon2.hash(options.password);
    let coach;
    try {
      //query builder
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Coach)
        .values({
          username: options.username,
          password: hashedPassword,
          email: options.email,
          firstName: options.firstName,
          lastName: options.lastName,
          isCoordinator,
        })
        .returning("*")
        .execute();
      coach = result.raw[0];
    } catch (err) {
      // duplicate username error
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "This user already exists",
            },
          ],
        };
      }
    }

    //stores the users session
    //keep them logged in
    req.session.userId = coach.id;
    req.session.isCoordinator = coach.isCoordinator;
    return { coach };
  }

  @Mutation(() => CoachResponse)
  async loginCoach(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<CoachResponse> {
    /*
      Users can use username or email to log in 
      Therefore we are using a ternary conditional to know if it 
      is a username or an email
    */
    const coach = await Coach.findOne(
      username.includes("@")
        ? { where: { email: username } }
        : { where: { username: username } }
    );
    if (!coach) {
      return {
        errors: [
          {
            field: "username",
            message: "This username or email does not exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(coach.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "The password is incorrect",
          },
        ],
      };
    }

    req.session.userId = coach.id;
    req.session.isCoordinator = coach.isCoordinator;
    return {
      coach,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        res.clearCookie(COOKIE_NAME);
        if (error) {
          console.log(error);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
