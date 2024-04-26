import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import BadRequestError from "../../errors/BadRequestError";

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
      return next(new BadRequestError(errors));
    }
  };
};

export { validateData };
