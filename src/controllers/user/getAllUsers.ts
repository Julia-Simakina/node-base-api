import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import CustomError from "../../errors/CustomError";
import User from "../../db/entity/User";

export default async function getAllUsers(
  req: Request,
  res: Response<User[]>,
  next: NextFunction
) {
  try {
    const users = await userRepository.find();

    return res.json(users);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
