import { Router } from "express";
import { getUserData, updateUserData, deleteUser } from "../controllers/user";
import { updateUserDataValidation } from "../middlewares/validation/userValidation";

const userRouter = Router();

userRouter.get("/:id", getUserData);
userRouter.put("/:id", updateUserDataValidation, updateUserData);
userRouter.delete("/:id", deleteUser);

export default userRouter;
