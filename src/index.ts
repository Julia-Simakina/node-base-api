import * as express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes";
import "dotenv/config";
import { errorHandler } from "./middlewares/errorHandler";

const { PORT = 3000 } = process.env;

AppDataSource.initialize();

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, function () {
  console.log("Сервер ожидает подключения...");
});
