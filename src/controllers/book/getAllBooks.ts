import { Request, Response, NextFunction } from "express";
import bookRepository from "../../db/bookRepository";
import Book from "../../db/entity/Book";
import { CANCELLED } from "dns";

type GetBooksResponseType = {
  books: Book[];
  numberOfPages: number;
  currentPage: number;
};

export default async function getAllBooks(
  req: Request,
  res: Response<GetBooksResponseType>,
  next: NextFunction
) {
  try {
    const itemsPerPage = Number(req.query.itemsPerPage);
    const currentPage = Number(req.query.currentPage);

    console.log("query from BOOK", req.query);

    const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;

    const [books, booksCount] = await bookRepository.findAndCount({
      skip: startIndex,
      take: itemsPerPage,
    });

    const numberOfPages = Math.ceil(booksCount / itemsPerPage);

    return res.json({ books, numberOfPages, currentPage });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
