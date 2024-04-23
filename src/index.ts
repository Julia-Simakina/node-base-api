import * as express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes";

AppDataSource.initialize();

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});
