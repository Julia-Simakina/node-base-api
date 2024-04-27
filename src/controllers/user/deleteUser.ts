import { Request, Response, NextFunction } from "express";
import userRepository from "../../db";

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

export { deleteUser };
