import { Request, Response, NextFunction } from "express";
import userRepository from "../../db/userRepository";
import * as fs from "fs";
import * as uuid from "uuid";
import User from "../../db/entity/User";
import CustomError from "../../errors/CustomError";

const validImageExtensions = ["jpeg", "jpg", "png", "gif"];

const uploadAvatar = async (
  req: Request,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const image = req.body.image;
    const id = req.user.id;

    if (!image.includes(";base64,")) {
      return next(
        CustomError.BadRequestError("Invalid image format. Must be base64.")
      );
    }

    const [metadata, bs64payload] = image.split(";base64,");

    const [_meta, extension] = metadata.split("/");

    if (!validImageExtensions.includes(extension)) {
      return next(CustomError.BadRequestError("Unsupported image format."));
    }

    const avatarName = `${id}-avatar${uuid.v4()}.${extension}`;

    await fs.promises.writeFile(`public/${avatarName}`, bs64payload, "base64");

    req.user.avatar = avatarName;

    const userWithNewAvatar = await userRepository.save(req.user);

    return res.status(200).json(userWithNewAvatar);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default uploadAvatar;
