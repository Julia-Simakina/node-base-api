import { Router } from "express";
import userController from "../controllers/controllers";

const userRouter = Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
// userRouter.get("/auth", userController.check);

export default userRouter;
