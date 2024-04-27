import { Request, Response, NextFunction } from "express";
import userRepository from "../../db";
import { ApiError } from "../../errors/ApiError";

async function getUserData(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      return next(ApiError.NotFoundError("User not found"));
    }

    return res.json(user);
  } catch (error) {
    console.error("Error while edit params:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while editing the user" });
  }
}

export { getUserData };
