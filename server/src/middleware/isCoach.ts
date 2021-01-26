import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isCoach: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (context.req.session.isCoordinator) {
    throw new Error("Only coaches can create new meetings");
  }

  return next();
};
