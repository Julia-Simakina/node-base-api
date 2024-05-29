import { Request, Response, NextFunction } from "express";
import * as fs from "fs";

const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.body.image;
    const id = req.user.id;

    const data = image.split(";base64,");
    const extension = data[0].split("/")[1];
    const filePath = `public/${id}-avatar.${extension}`;

    await fs.promises.writeFile(filePath, data[1], "base64");
    console.log("Изображение успешно сохранено по пути:", filePath);

    res
      .status(200)
      .json({ message: "Изображение успешно сохранено", fileContent: image });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default uploadAvatar;
