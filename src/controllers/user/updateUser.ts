import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import hashPassword from "../../utils/hashPassword";
import CustomError from "../../errors/CustomError";
import User from "../../db/entity/User";

export default async function updateUser(
  req: Request,
  res: Response<User>,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (Number(id) !== userId) {
      return next(CustomError.ForbiddenError("You can only edit your profile"));
    }

    const newUserData: Partial<User> = { ...req.body };

    if (newUserData.email) {
      const userWithReqEmail = await userRepository.findOne({
        where: { email: newUserData.email },
      });

      if (userWithReqEmail) {
        if (
          userWithReqEmail.email == newUserData.email &&
          userWithReqEmail.id !== userId
        ) {
          return next(
            CustomError.ConflictError(
              "A user with this email already exists",
              "email"
            )
          );
        }
      }
    }

    if (newUserData.password) {
      newUserData.password = hashPassword(newUserData.password);
    }

    await userRepository.update(userId, newUserData);

    Object.assign(req.user, newUserData);

    delete req.user.password;

    res.status(200).send(req.user);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
