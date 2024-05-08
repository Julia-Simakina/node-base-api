import { Router } from "express";
import loginUser from "../controllers/auth/loginUser";
import registerUser from "../controllers/auth/registerUser";
import refreshToken from "../controllers/auth/refreshToken";
import schemas from "../middlewares/validation/authValidation";
import validateData from "../middlewares/validation";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateData(schemas.userRegisterSchema),
  registerUser
);

authRouter.post("/signin", validateData(schemas.userLoginSchema), loginUser);

authRouter.post(
  "/refresh",
  validateData(schemas.refreshTokenSchema),
  refreshToken
);

export default authRouter;
