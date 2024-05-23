import { Router } from "express";
import signIn from "../controllers/auth/signIn";
import signUp from "../controllers/auth/signUp";
import refreshToken from "../controllers/auth/refreshToken";
import schemas from "../middlewares/validation/authValidation";
import validateData from "../middlewares/validation";

const authRouter = Router();

authRouter.post("/signup", validateData(schemas.userRegisterSchema), signUp);

authRouter.post("/signin", validateData(schemas.userLoginSchema), signIn);

authRouter.post(
  "/refresh",
  validateData(schemas.refreshTokenSchema),
  refreshToken
);

export default authRouter;
