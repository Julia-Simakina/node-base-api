import { Router } from "express";
import userRouter from "./userRouter";

const router = Router();

router.use("/user", userRouter);

router.use("*", (req, res, next) => {
  next(new Error("Страница не найдена"));
});

export default router;
