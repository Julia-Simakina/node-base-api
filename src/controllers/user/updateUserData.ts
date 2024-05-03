import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import hashPassword from "../../utils/hashPassword";
import CustomError from "../../errors/CustomError";
import User from "../../db/entity/User";
import { DeepPartial } from "typeorm";

type BodyType = {
  fullName?: string | undefined;
  email?: string | undefined;
  dayOfBirth?: Date | undefined;
  password?: string | undefined;
};

export default async function updateUserData(
  req: Request<any, any, BodyType>,
  res: Response,
  next: NextFunction
) {
  try {
    const updatedUser = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!updatedUser) {
      return next(CustomError.NotFoundError("User not found"));
    }

    // const { fullName, email, dayOfBirth, password } = req.body;

    await userRepository.update(Number(req.params.id), {
      // fullName,
      // email,
      // dayOfBirth,
      password: hashPassword(req.body.password),
    });

    res.send(updatedUser);
  } catch (error) {
    console.error(error);
  }
}
