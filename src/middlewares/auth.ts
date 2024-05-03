import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import CustomError from "../errors/CustomError";

const { ACCESS_KEY } = process.env;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(CustomError.AuthError("Unauthorized"));
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, ACCESS_KEY);

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(CustomError.AuthError("Token expired"));
    }

    return next(CustomError.AuthError("Unauthorized"));
  }
};

export default authMiddleware;
