import { Router } from "express";
import getAllUsers from "../controllers/user/getAllUsers";
import updateUser from "../controllers/user/updateUser";
import deleteUser from "../controllers/user/deleteUser";
import getOneUser from "../controllers/user/getOneUser";
import validateData from "../middlewares/validation";
import schemas from "../middlewares/validation/userValidation";

import getMe from "../controllers/user/getMe";
import comparePassword from "../controllers/user/comparePassword";
import uploadAvatar from "../controllers/user/uploadAvatar";

const userRouter = Router();

userRouter.post(
  "/upload-avatar",
  validateData(schemas.uploadAvatarSchema),
  uploadAvatar
);
userRouter.get("/getme", getMe);
userRouter.get("/all", getAllUsers);
// userRouter.post("/:id/comparePassword", comparePassword);
userRouter.get("/:id", validateData(schemas.getUserSchema), getOneUser);
userRouter.put("/:id", validateData(schemas.updateUserSchema), updateUser);
userRouter.delete("/:id", validateData(schemas.deleteUserSchema), deleteUser);

export default userRouter;
