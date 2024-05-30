import * as yup from "yup";

const dobSchema = yup.date().min(new Date(1900, 0, 1)).max(new Date());

const updateUserSchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
  body: yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(5),
    dayOfBirth: yup.date().min(new Date(1900, 0, 1)).max(new Date()),
  }),
};

const uploadAvatarSchema = {
  body: yup.object().shape({
    avatar: yup.string(),
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
  uploadAvatarSchema,
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
};
