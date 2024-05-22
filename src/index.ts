import * as express from "express";
import AppDataSource from "./db/data-source";
import router from "./routes";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler";
import User from "./db/entity/User";
import * as cors from "cors";
import { Request, Response } from "express";
import * as multer from "multer";
import * as path from "path";

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

app.use(express.json());

const storage: multer["storageEngine"] = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        (path.extname(file.originalname) as string)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("avatar"), (req: any, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  return res.json({ imageUrl: `http://localhost:${PORT}/${file.filename}` });
});

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
