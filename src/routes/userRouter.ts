import { Router } from "express";
import userController from "../controllers/controllers";
import verifyToken from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);

userRouter.use(verifyToken);

userRouter.get("/:id", userController.getUserData);
userRouter.put("/:id", userController.updateUserData);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
