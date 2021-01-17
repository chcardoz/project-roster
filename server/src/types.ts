import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";

interface customSessionProperties extends Session {
  userId?: number;
  isCoordinator?: boolean;
}

export type MyContext = {
  req: Request & { session: customSessionProperties };
  res: Response;
  redis: Redis;
};
