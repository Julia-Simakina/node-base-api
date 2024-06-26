import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import User from "../../db/entity/User";
import userRepository from "../../db/userRepository";
import hashPassword from "../../utils/hashPassword";
import CustomError from "../../errors/CustomError";
import generateTokenPair from "../../utils/generateToken";
import { ResponseType } from "../../types/types";

export default async function signUp(
  req: Request,
  res: Response<ResponseType>,
  next: NextFunction
) {
  try {
    const { name, email, password, dayOfBirth, avatar }: User = req.body;
    const existingUser = await userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      return next(
        CustomError.ConflictError(
          " A user with this email already exists",
          "email"
        )
      );
    }

    const hashedPassword = hashPassword(password);

    const user = new User();
    user.name = name;
    user.avatar = avatar;
    user.email = email;
    user.password = hashedPassword;
    user.dayOfBirth = dayOfBirth;

    const newUser = await userRepository.save(user);
    delete newUser.password;

    const tokens = generateTokenPair(user.id);

    return res.status(201).send({ tokens, user: newUser });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
