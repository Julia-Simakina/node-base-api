import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import userRepository from "../../db";
import { ApiError } from "../../errors/ApiError";
import { hashPassword } from "../../utils/hashPassword";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken";

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return next(ApiError.AuthError("Invalid email"));
    }

    // if (user.password !== hashedPassword) {                         //в user нет поля password (selected: false)
    //   return next(new AuthError("Invalid password"));
    // }

    const userWithValidPassword = await userRepository.findOne({
      where: { password: hashedPassword },
    });

    if (!userWithValidPassword) {
      return next(ApiError.AuthError("Invalid password"));
    }

    const accessToken = generateAccessToken(userWithValidPassword.id);
    const refreshToken = generateRefreshToken(userWithValidPassword.id);

    return res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    return next(error);
  }
}

export { loginUser, generateAccessToken };
