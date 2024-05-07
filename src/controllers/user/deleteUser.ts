import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import CustomError from "../../errors/CustomError";

export default async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (Number(id) !== userId) {
      return next(
        CustomError.ForbiddenError("You can only delete your profile")
      );
    }

    if (!req.user) {
      return next(CustomError.NotFoundError("User not found"));
    }

    await userRepository.softDelete(userId);

    res.send(`User id ${userId} has been deleted.`);
  } catch (error) {
    console.error(error);
  }
}
