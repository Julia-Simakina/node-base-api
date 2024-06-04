import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import Book from "../../db/entity/Book";
import bookRepository from "../../db/bookRepository";

export default async function addBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      name,
      authorName,
      cover,
      paperBackPrice,
      hardCoverPrice,
      dateOfIssue,
      rating,
      status,
      description,
      genre,
    }: Book = req.body;

    const book = new Book();
    book.name = name;
    book.authorName = authorName;
    book.cover = cover;
    book.paperBackPrice = paperBackPrice;
    book.hardCoverPrice = hardCoverPrice;
    book.dateOfIssue = dateOfIssue;
    book.rating = rating;
    book.status = status;
    book.description = description;
    book.genre = genre;

    const newBook = await bookRepository.save(book);

    return res.status(201).send(newBook);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
