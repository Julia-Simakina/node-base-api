import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { validateLogin } from "../middlewares/validation/userValidation";

const authRouter = Router();

authRouter.post("/registration", validateLogin, registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
