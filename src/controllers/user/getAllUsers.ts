import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import CustomError from "../../errors/CustomError";

export default async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await userRepository.find();

    if (!users) {
      return next(CustomError.NotFoundError("Users not found"));
    }

    return res.json(users);
  } catch (error) {
    console.error(error);
  }
}
