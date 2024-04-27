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
    const { fullName, email, password, dob }: User = req.body;

    const existingUser: User = await AppDataSource.manager.findOne(User, {
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
    user.dob = dob;

    await userRepository.save(user);

    delete user.password;
    delete user.deletedAt;

    return res.status(201).send(user);
  } catch (error) {
    return next(error);
  }
}

export { registerUser };
