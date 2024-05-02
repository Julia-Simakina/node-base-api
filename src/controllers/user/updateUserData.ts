import { Request, Response, NextFunction } from "express";
import userRepository from "../../db";
import { hashPassword } from "../../utils/hashPassword";

async function updateUserData(req: Request, res: Response) {
  try {
    const { fullName, email, dayOfBirth, password } = req.body;

    await userRepository.update(Number(req.params.id), {
      fullName: fullName,
      email,
      dayOfBirth,
      password: hashPassword(password),
    });

    const updatedUser = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    res.send(updatedUser);
  } catch (error) {
    console.error("Error while fetching user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching user" });
  }
}

export { updateUserData };
