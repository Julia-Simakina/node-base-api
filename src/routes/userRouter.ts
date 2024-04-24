import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { getUserData, updateUserData, deleteUser } from "../controllers/user";
import authMiddleware from "../middlewares/auth";
import { validateLogin } from "../middlewares/validation/userValidation";

const userRouter = Router();

userRouter.post("/registration", validateLogin, registerUser);
userRouter.post("/login", loginUser);

userRouter.use(authMiddleware);

userRouter.get("/:id", getUserData);
userRouter.put("/:id", updateUserData);
userRouter.delete("/:id", deleteUser);

export default userRouter;
