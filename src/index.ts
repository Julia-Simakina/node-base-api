import * as express from "express";
import AppDataSource from "./db/data-source";
import router from "./routes";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler";
import User from "./db/entity/User";
import * as cors from "cors";

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

app.use(cors());

app.use(express.json({ limit: "100mb" }));

app.use("/public", express.static("public"));

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
