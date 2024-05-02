import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "fusion",
  database: "users",
  synchronize: false,
  logging: false,
  // entities: ["src/entity/*.ts"],
  entities: [`${__dirname}/entity/*.ts`],

  migrations: [`${__dirname}/migrations/*.ts`],
  subscribers: [],
});
