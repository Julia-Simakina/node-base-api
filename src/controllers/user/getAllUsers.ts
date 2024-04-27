import { Request, Response, NextFunction } from "express";
import userRepository from "../../db";
import { ApiError } from "../../errors/ApiError";

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userRepository.find();
    console.log("alll users>>>>", users);

    if (!users) {
      return next(ApiError.NotFoundError("Users not found"));
    }

    return res.json(users);
  } catch (error) {
    console.error("Error while edit params:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while editing the users" });
  }
}

export { getAllUsers };
