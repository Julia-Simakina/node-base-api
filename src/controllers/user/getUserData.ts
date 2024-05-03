import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import CustomError from "../../errors/CustomError";

export default async function getUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      return next(CustomError.NotFoundError("User not found"));
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
  }
}
