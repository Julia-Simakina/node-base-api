import * as yup from "yup";

const userRegisterSchema = {
  body: yup.object().shape({
    fullName: yup.string().min(2),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    dayOfBirth: yup.date().min(new Date(1900, 0, 1)).max(new Date()),
  }),
};

const userLoginSchema = {
  body: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  }),
};

const refreshTokenSchema: yup.ObjectShape = {
  body: yup.object().shape({
    refreshToken: yup.string().required(),
  }),
};

export default {
  userRegisterSchema,
  userLoginSchema,
  refreshTokenSchema,
};
