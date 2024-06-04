import { Request, Response, NextFunction } from "express";
import bookRepository from "../../db/bookRepository";
import Book from "../../db/entity/Book";

export default async function getOneBook(
  req: Request,
  res: Response<Book>,
  next: NextFunction
) {
  try {
    const book = await bookRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!book) {
      return next("Book not found");
    }

    return res.json(book);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
