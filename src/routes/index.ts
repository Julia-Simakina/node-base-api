import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import CustomError from "../errors/CustomError";

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("*", (req, res, next) => {
  return next(CustomError.NotFoundError("The page was not found"));
});

export default router;
