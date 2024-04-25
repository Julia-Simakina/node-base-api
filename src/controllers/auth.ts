import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import * as crypto from "crypto";

import userRepository from "../db";

const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, "random_secret_key", { expiresIn: "5s" });
};
const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, "refresh_secret_key", { expiresIn: "5d" });
};

const hashPassword = (password: string) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

async function registerUser(req: Request, res: Response) {
  try {
    const { fullName, email, password, dob }: User = req.body;

    const existingUser: User = await AppDataSource.manager.findOne(User, {
      where: { email: email },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "A user with this email already exists" });
    }

    const hashedPassword = hashPassword(password);

    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = hashedPassword;
    user.dob = dob;

    await userRepository.save(user);

    delete user.password;

    return res.status(201).send(user);
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during registration" });
  }
}

// async function loginUser(req: Request, res: Response) {
//   try {
//     const { email, password } = req.body;
//     const hashedPassword = hashPassword(password);
//     const user = await userRepository.findOne({
//       where: { email: email, password: hashedPassword },
//     });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }
//     let accessToken = (<any>user).accessToken;
//     let refreshToken = (<any>user).refreshToken;
//     if (!accessToken || jwt.verify(accessToken, "access_secret_key")) {
//       accessToken = generateAccessToken(user.id);
//       refreshToken = generateRefreshToken(user.id);

//       (<any>user).accessToken = accessToken;
//       (<any>user).refreshToken = refreshToken;
//       await userRepository.save(user);
//     }
//     return res.status(200).send({ accessToken, refreshToken });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ error: "An error occurred during login" });
//   }
// }

async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await userRepository.findOne({
      where: { email: email, password: hashedPassword },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    let accessToken = (<any>user).accessToken;
    let refreshToken = (<any>user).refreshToken;
    if (!accessToken || jwt.verify(accessToken, "random_secret_key")) {
      accessToken = generateAccessToken(user.id);
      refreshToken = generateRefreshToken(user.id);
      (<any>user).accessToken = accessToken;
      (<any>user).refreshToken = refreshToken;
      await userRepository.save(user);
    }
    return res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
}

export { registerUser, loginUser };
