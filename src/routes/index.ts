import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import authMiddleware from "../middlewares/auth";
import { ApiError } from "../errors/ApiError";

const router = Router();

router.use("/", authRouter);

router.use(authMiddleware);

router.use("/user", userRouter);

router.use("*", (req, res, next) => {
  next(ApiError.NotFoundError("The page was not found"));
});

export default router;
