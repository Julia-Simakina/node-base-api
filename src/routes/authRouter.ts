import { Router } from "express";
import loginUser from "../controllers/auth/loginUser";
import registerUser from "../controllers/auth/registerUser";
import refreshToken from "../controllers/auth/refreshToken";
import {
  validateRegister,
  validateLogin,
  validateRefreshToken,
} from "../middlewares/validation/authValidation";

const authRouter = Router();

authRouter.post("/registration", validateRegister, registerUser);
authRouter.post("/login", validateLogin, loginUser);
authRouter.post("/refresh", validateRefreshToken, refreshToken);

export default authRouter;
