import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import CustomError from "../errors/CustomError";
import User from "../db/entity/User";
import userRepository from "../db/userRepository";
import { JwtPayloadType } from "../types/types";

const { ACCESS_KEY } = process.env;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(CustomError.AuthError("Unauthorized", ""));
    }

    const token = authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, ACCESS_KEY) as JwtPayloadType;

    const user: User = await userRepository.findOne({
      where: { id: Number(decodedToken.id) },
    });

    if (!user) {
      return next(CustomError.NotFoundError("User not found", "id"));
    }

    req.user = user;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(CustomError.AuthError("Token expired", ""));
    }
    return next(CustomError.AuthError("Unauthorized", "password"));
  }
};

export default authMiddleware;
