import { Request, Response, NextFunction } from "express";
import bookRepository from "../../db/bookRepository";
import Book from "../../db/entity/Book";

export default async function getAllBooks(
  req: Request,
  res: Response<Book[]>,
  next: NextFunction
) {
  try {
    const books = await bookRepository.find();

    return res.json(books);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
