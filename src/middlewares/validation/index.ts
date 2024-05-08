import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import CustomError from "../../errors/CustomError";
import { ValidationErrorType } from "../../types/types";

const validateData = (schema: yup.ObjectShape) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await yup.object().shape(schema).validate(req, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.map<ValidationErrorType>(
          (err: yup.ValidationError) => {
            return {
              field: err.path,
              message: err.message,
            };
          }
        );

        return next(CustomError.BadRequestError("Validation error", errors));
      }

      throw error;
    }
  };
};

export default validateData;
