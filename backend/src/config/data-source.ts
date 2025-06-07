import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user.models";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "rttms",
  synchronize: true, // set to false in production
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
