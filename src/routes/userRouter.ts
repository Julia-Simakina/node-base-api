import { Router } from "express";
import { getUserData, updateUserData, deleteUser } from "../controllers/user";

const userRouter = Router();

userRouter.get("/:id", getUserData);
userRouter.put("/:id", updateUserData);
userRouter.delete("/:id", deleteUser);

export default userRouter;
