import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import AuthError from "../errors/AuthError";

const { ACCESS_KEY } = process.env;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new AuthError("Invalid email or password"));
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, ACCESS_KEY);

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AuthError("Token died"));
    }

    return next(new AuthError("Unauthorized"));
  }
};

export default authMiddleware;
