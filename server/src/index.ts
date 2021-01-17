import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { createConnection } from "typeorm";
import typeormConfig from "./typeorm.config";
import { applyMiddleware } from "./utils/applyMiddleware";

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
