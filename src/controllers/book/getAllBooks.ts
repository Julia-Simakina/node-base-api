import { Request, Response, NextFunction } from "express";
import bookRepository from "../../db/bookRepository";
import Book from "../../db/entity/Book";

type GetBooksResponseType = {
  slicedCards: Book[];
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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [books, booksCount] = await bookRepository.findAndCount();

    let numberOfPages = Math.ceil(booksCount / itemsPerPage);

    // for (let i = 1; i <= Math.ceil(booksCount / itemsPerPage); i++) {
    //   numbers.push(i);
    // }

    const slicedCards = books.slice(startIndex, endIndex);

    console.log(currentPage);
    return res.json({ slicedCards, numberOfPages, currentPage });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
