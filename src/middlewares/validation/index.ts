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

export { validateData };
