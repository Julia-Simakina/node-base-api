import { Request, Response, NextFunction } from "express";
import genreRepository from "../../db/genreRepository";

export default async function getAllGenre(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const genre = await genreRepository.find();

    if (!genre) {
      return next("Genre not found");
    }

    return res.json(genre);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
