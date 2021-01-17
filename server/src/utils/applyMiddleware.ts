import { COOKIE_NAME, __prod__ } from "../constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { CoachResolver } from "../resolvers/coach";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "../types";
import cors from "cors";
import { StudentResolver } from "../resolvers/student";
import { Express } from "apollo-server-express/node_modules/@types/express/node_modules/@types/express-serve-static-core";
import { Redis } from "ioredis";

export async function applyMiddleware(
  app: Express,
  RedisStore: connectRedis.RedisStore,
  redis: Redis
) {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  //Redis middleware for express sessions
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis as any, disableTouch: true }),
      secret: "asdfasdterwtgewrygbvbnetywretfsdhj",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  //Apollo Middleware for graphql endpoint
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CoachResolver, StudentResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
}
