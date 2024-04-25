import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.use("/", authRouter);

router.use(authMiddleware);

router.use("/user", userRouter);

router.use("*", (req, res, next) => {
  next(new Error("Страница не найдена"));
});

export default router;
