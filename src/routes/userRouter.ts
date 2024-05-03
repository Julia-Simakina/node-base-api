import { Router } from "express";
import getAllUsers from "../controllers/user/getAllUsers";
import updateUserData from "../controllers/user/updateUserData";
import deleteUser from "../controllers/user/deleteUser";
import getUserData from "../controllers/user/getUserData";
import updateUserDataValidation from "../middlewares/validation/userValidation";
import authMiddleware from "../middlewares/auth";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/all", getAllUsers);
userRouter.get("/:id", getUserData);
userRouter.put("/:id", updateUserDataValidation, updateUserData);
userRouter.delete("/:id", deleteUser);

export default userRouter;
