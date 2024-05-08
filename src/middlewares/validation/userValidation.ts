import * as yup from "yup";

const dobSchema = yup.date().min(new Date(1900, 0, 1)).max(new Date());

const updateUserSchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
  body: yup.object().shape({
    fullName: yup.string().min(2),
    email: yup.string().email(),
    password: yup.string().min(5),
    dayOfBirth: yup.date().min(new Date(1900, 0, 1)).max(new Date()),
  }),
};

const getUserSchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
};

const deleteUserSchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
};

export default {
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
};
