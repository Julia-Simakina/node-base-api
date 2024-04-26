import "dotenv/config";
const { ACCESS_KEY, REFRESH_KEY } = process.env;
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import * as crypto from "crypto";

import userRepository from "../db";
import ConflictError from "../errors/ConflictError";
import AuthError from "../errors/AuthError";

const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, ACCESS_KEY, { expiresIn: "10s" });
};
const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, REFRESH_KEY, { expiresIn: "5d" });
};

const hashPassword = (password: string) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { fullName, email, password, dob }: User = req.body;

    const existingUser: User = await AppDataSource.manager.findOne(User, {
      where: { email: email },
    });
    if (existingUser) {
      return next(new ConflictError("A user with this email already exists"));
    }

    const hashedPassword = hashPassword(password);

    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = hashedPassword;
    user.dob = dob;

    await userRepository.save(user);

    delete user.password;
    delete user.deletedAt;

    return res.status(201).send(user);
  } catch (error) {
    return next(error);
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await userRepository.findOne({
      where: { email: email, password: hashedPassword },
    });

    if (!user) {
      return next(new AuthError("Invalid email or password"));
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    return next(error);
  }
}

export { registerUser, loginUser, generateAccessToken, hashPassword };
