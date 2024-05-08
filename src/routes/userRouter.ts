import { Router } from "express";
import getAllUsers from "../controllers/user/getAllUsers";
import updateUser from "../controllers/user/updateUser";
import deleteUser from "../controllers/user/deleteUser";
import getOneUser from "../controllers/user/getOneUser";
import validateData from "../middlewares/validation";
import schemas from "../middlewares/validation/userValidation";
import authMiddleware from "../middlewares/auth";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/all", getAllUsers);
userRouter.get("/:id", validateData(schemas.getUserSchema), getOneUser);
userRouter.put("/:id", validateData(schemas.updateUserSchema), updateUser);
userRouter.delete("/:id", validateData(schemas.deleteUserSchema), deleteUser);

export default userRouter;
