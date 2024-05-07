import { Router } from "express";
import getAllUsers from "../controllers/user/getAllUsers";
import updateUserData from "../controllers/user/updateUserData";
import deleteUser from "../controllers/user/deleteUser";
import getOneUser from "../controllers/user/getOneUser";
import {
  updateUserValidation,
  getUserValidation,
  deleteUserValidation,
} from "../middlewares/validation/userValidation";
import authMiddleware from "../middlewares/auth";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/all", getAllUsers);
userRouter.get("/:id", getUserValidation, getOneUser);
userRouter.put("/:id", updateUserValidation, updateUserData);
userRouter.delete("/:id", deleteUserValidation, deleteUser);

export default userRouter;
