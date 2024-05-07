import * as express from "express";
import AppDataSource from "./db/data-source";
import router from "./routes";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler";
import User from "./db/entity/User";

const { PORT = 3000 } = process.env;

AppDataSource.initialize();

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, function () {
  console.log("Сервер ожидает подключения...");
});

process.on("uncaughtException", (err) => {
  console.log("uncaughtException: ", err);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection: ", err);
});
