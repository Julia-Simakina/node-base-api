import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import CustomError from "../../errors/CustomError";

const validateData = (schema: yup.Schema<unknown>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.inner.map((err: yup.ValidationError) => ({
        field: err.path,
        message: err.message,
      }));
      return next(CustomError.BadRequestError(JSON.stringify(errors)));
    }
  };
};

export default validateData;
