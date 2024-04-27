import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { ApiError } from "../errors/ApiError";

const { ACCESS_KEY } = process.env;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(ApiError.AuthError("Invalid email or password"));
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, ACCESS_KEY);

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(ApiError.AuthError("Token died"));
    }

    return next(ApiError.AuthError("Unauthorized"));
  }
};

export default authMiddleware;
