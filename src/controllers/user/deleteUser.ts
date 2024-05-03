import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import CustomError from "../../errors/CustomError";

export default async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deletedUser = await userRepository.findOne({
      where: { id: Number(req.params.id), deletedAt: null },
    });

    if (!deletedUser) {
      return next(CustomError.NotFoundError("User not found"));
    }

    await userRepository.softDelete(req.params.id);

    res.send(`User id ${req.params.id} has been deleted.`);
  } catch (error) {
    console.error(error);
  }
}
