import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import CustomError from "../errors/CustomError";
import bookRouter from "./bookRouter";
import cartRouter from "./cartRouter";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.use("/auth", authRouter);
router.use("/book", bookRouter);

router.use(authMiddleware);

router.use("/cart", cartRouter);
router.use("/user", userRouter);

router.use("*", (req, res, next) => {
  return next(CustomError.NotFoundError("The page was not found", "path"));
});

export default router;
