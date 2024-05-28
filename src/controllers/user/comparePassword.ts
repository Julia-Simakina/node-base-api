import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import CustomError from "../../errors/CustomError";
import hashPassword from "../../utils/hashPassword";
import generateTokenPair from "../../utils/generateToken";

export default async function comparePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const { password } = req.body;
    const { id } = req.params;

    // if (Number(id) !== userId) {
    //   return next(
    //     CustomError.ForbiddenError("You can only update your profile")
    //   );
    // }

    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["password", "id"],
    });

    if (!user) {
      return next(
        CustomError.NotFoundError(
          "The user with this email was not found",
          "email"
        )
      );
    }

    const hashedPassword = hashPassword(password);

    if (user.password !== hashedPassword) {
      return next(CustomError.AuthError("Invalid password", "password"));
    }

    // delete user.password;

    // const tokens = generateTokenPair(user.id);

    return res.status(200).send("Success");
  } catch (error) {
    console.error(error);
    throw error;
  }
}
