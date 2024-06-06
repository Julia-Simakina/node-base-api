import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import Book from "../../db/entity/Book";
import bookRepository from "../../db/bookRepository";
import AppDataSource from "../../db/data-source";
import genreRepository from "../../db/genreRepository";
import CustomError from "../../errors/CustomError";

export default async function addBook(
  req: Request,
  res: Response<Book>,
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
      genresIds,
    } = req.body;

    console.log("genres >>>>>", genresIds);

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

    const genre = await genreRepository.findOne({
      where: {
        id: genresIds,
      },
    });

    if (!genre) {
      throw CustomError.BadRequestError("wrong genre id");
    }

    book.genres = [genre];

    const newBook = await bookRepository.save(book);

    const bookWithGenres = await bookRepository.findOne({
      where: {
        id: newBook.id,
      },
      relations: {
        genres: true,
      },
    });

    return res.status(201).send(bookWithGenres);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
