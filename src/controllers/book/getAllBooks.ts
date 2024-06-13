import { Request, Response, NextFunction } from "express";
import bookRepository from "../../db/bookRepository";
import Book from "../../db/entity/Book";
import { In } from "typeorm";

type GetBooksResponseType = {
  books: Book[];
  numberOfPages: number;
  currentPage: number;
  genreIdsArr: number[];
};

export default async function getAllBooks(
  req: Request,
  res: Response<GetBooksResponseType>,
  next: NextFunction
) {
  try {
    const itemsPerPage = Number(req.query.itemsPerPage);
    const currentPage = Number(req.query.currentPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    let genreIdsArr: number[] = [];

    if (req.query.selectedGenres) {
      const genreIds = req.query.selectedGenres as string;
      genreIdsArr = genreIds.split(",").map((i) => Number(i));
    }

    const query = {
      relations: { genres: true },
      skip: startIndex,
      take: itemsPerPage,
    };

    if (genreIdsArr.length > 0) {
      query["where"] = {
        genres: {
          id: In(genreIdsArr),
        },
      };
    }

    const [books, booksCount] = await bookRepository.findAndCount(query);
    const numberOfPages = Math.ceil(booksCount / itemsPerPage);

    return res.json({ books, numberOfPages, currentPage, genreIdsArr });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
