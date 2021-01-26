import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isCoordinator: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.isCoordinator) {
    throw new Error("Only coordinators can create new students");
  }

  return next();
};
