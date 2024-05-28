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
import * as fs from "fs";

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
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post(
  "/upload-avatar",
  upload.single("avatar"),
  (req: any, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // const uploadedFilePath: string = req.file.path.replace(/\\/g, "/");

    return res.status(200).json({
      message: "Avatar uploaded successfully",
      imagePath: req.file.path,
    });
  }
);
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
