import "reflect-metadata";
import typeormConfig from "./typeorm.config";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";
import { applyMiddleware } from "./utils/applyMiddleware";
import Redis from "ioredis";

const main = async () => {
  const connection = await createConnection(typeormConfig);
  console.log(connection.isConnected);
  await connection.runMigrations();

  //Set up an express server
  const app = express();

  //Connect to the Redis store
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  await applyMiddleware(app, RedisStore, redis);

  app.listen(4000, () => {
    console.log("server started at localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
