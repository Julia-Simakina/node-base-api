import { Router } from "express";
import { loginUser } from "../controllers/auth/loginUser";
import { registerUser } from "../controllers/auth/registerUser";
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
