import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { refreshToken } from "../controllers/refreshToken";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validation/authValidation";

const authRouter = Router();

authRouter.post("/registration", validateRegister, registerUser);
authRouter.post("/login", validateLogin, loginUser);
authRouter.post("/refresh", refreshToken);

export default authRouter;
