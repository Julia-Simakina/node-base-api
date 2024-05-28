import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import CustomError from "../../errors/CustomError";
import User from "../../db/entity/User";

export default async function getOneUser(
  req: Request,
  res: Response<User>,
  next: NextFunction
) {
  try {
    const user = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      return next(CustomError.NotFoundError("User not found", "id"));
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
