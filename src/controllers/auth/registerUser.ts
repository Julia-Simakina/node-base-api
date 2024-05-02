import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";

import userRepository from "../../db";
// import ConflictError from "../../errors/ConflictError";
import { hashPassword } from "../../utils/hashPassword";
import { ApiError } from "../../errors/ApiError";

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { fullName: fullName, email, password, dayOfBirth }: User = req.body;

    const existingUser = await AppDataSource.manager.findOne(User, {
      where: { email: email },
    });

    if (existingUser) {
      return next(
        ApiError.ConflictError("A user with this email already exists")
      );
    }

    const hashedPassword = hashPassword(password);

    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = hashedPassword;
    user.dayOfBirth = dayOfBirth;

    const newUser = await userRepository.save(user);

    return res.status(201).send(newUser);
  } catch (error) {
    return next(error);
  }
}

export { registerUser };
