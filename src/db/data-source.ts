import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "fusion",
  database: "users",
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entity/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
});

export default AppDataSource;
