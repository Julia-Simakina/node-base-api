import { Request, Response, NextFunction } from "express";
import genreRepository from "../../db/genreRepository";
import Genre from "../../db/entity/Genre";

type GetGenresResponseType = {
  genres: Genre[];
};

export default async function getAllGenre(
  req: Request,
  res: Response<GetGenresResponseType>,
  next: NextFunction
) {
  try {
    console.log("query from GENRE", req.query);
    const genres = await genreRepository.find();

    if (!genres) {
      return next("Genre not found");
    }

    return res.json({ genres });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
