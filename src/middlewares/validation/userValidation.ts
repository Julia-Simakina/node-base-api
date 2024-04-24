import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const validateData = (schema: yup.Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.inner.map((err: yup.ValidationError) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({ errors });
    }
  };
};

const userSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  dob: yup
    //.string()
    .date()
    .min(new Date(1900, 0, 1))
    .max(new Date().toISOString().split("T")[0])
    .required(),
  // .matches(
  //   /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
  //   "Date of birth must be in the format DD-MM-YYYY"
  // ),
});

export const validateLogin = validateData(userSchema);
