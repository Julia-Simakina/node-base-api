import { Request, Response, NextFunction } from "express";
import bookRepository from "../../db/bookRepository";
import Book from "../../db/entity/Book";

export default async function getAllBooks(
  req: Request,
  res: Response<Book[]>,
  next: NextFunction
) {
  try {
    const startIndex = Number(req.query.startIndex);
    const endIndex = Number(req.query.endIndex);

    const [books, booksCount] = await bookRepository.findAndCount();

    const slicedCards = books.slice(startIndex, endIndex);

    return res.json(slicedCards);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
