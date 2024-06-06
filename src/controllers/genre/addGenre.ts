import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import genreRepository from "../../db/genreRepository";

export default async function addGenre(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const genreData = req.body;
    const genre = await genreRepository.save({
      name: genreData.name,
    });

    return res.status(201).send(genre);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
