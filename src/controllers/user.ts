import { Request, Response } from "express";
import userRepository from "../db";
import { hashPassword } from "./auth";

async function getUserData(req: Request, res: Response) {
  try {
    const user = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error while edit params:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while editing the user" });
  }
}

async function updateUserData(req: Request, res: Response) {
  try {
    const { fullName, email, dob, password } = req.body;

    await userRepository.update(Number(req.params.id), {
      fullName,
      email,
      dob,
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

async function deleteUser(req: Request, res: Response) {
  try {
    await userRepository.softDelete(req.params.id);

    res.send(`User id ${req.params.id} has been deleted.`);
  } catch (error) {
    console.error("Error while fetching user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching user" });
  }
}

export { getUserData, updateUserData, deleteUser };
