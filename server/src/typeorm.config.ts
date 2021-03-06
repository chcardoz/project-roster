import { createConnection } from "typeorm";
import { Coach } from "./entities/Coach";
import { Student } from "./entities/Student";
import path from "path";
import { Meeting } from "./entities/Meeting";
import { Outreach } from "./entities/Outreach";

export default {
  type: "postgres",
  database: "lireddit2",
  username: "postgres",
  password: "poem2589",
  logging: true,
  entities: [Coach, Student, Meeting, Outreach],
  migrations: [path.join(__dirname, "./migrations/*")],
  synchronize: true,
} as Parameters<typeof createConnection>[0];
