import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import CustomError from "../errors/CustomError";
import bookRouter from "./bookRouter";

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/book", bookRouter);

router.use("*", (req, res, next) => {
  return next(CustomError.NotFoundError("The page was not found", "path"));
});

export default router;
