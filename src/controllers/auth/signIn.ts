import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import CustomError from "../../errors/CustomError";
import hashPassword from "../../utils/hashPassword";
import generateTokenPair from "../../utils/generateToken";
import { ResponseType } from "../../types/types";

export default async function signIn(
  req: Request,
  res: Response<ResponseType>,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOne({
      where: { email },
      select: ["password", "id", "email", "name", "avatar"],
    });

    if (!user) {
      return next(
        CustomError.NotFoundError(
          "The user with this email was not found",
          "email"
        )
      );
    }

    const hashedPassword = hashPassword(password);

    if (user.password !== hashedPassword) {
      return next(CustomError.AuthError("Invalid password", "password"));
    }

    delete user.password;

    const tokens = generateTokenPair(user.id);

    return res.status(200).send({ tokens, user });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
