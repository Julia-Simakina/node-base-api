import * as yup from "yup";
import validateData from ".";

const userRegisterSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  dayOfBirth: yup.date().min(new Date(1900, 0, 1)).max(new Date()).required(),
});

const userLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

const refreshTokenSchema = yup.object().shape({
  refreshToken: yup.string().required(),
});

const validateRegister = validateData(userRegisterSchema);
const validateLogin = validateData(userLoginSchema);
const validateRefreshToken = validateData(refreshTokenSchema);

export { validateRegister, validateLogin, validateRefreshToken };
