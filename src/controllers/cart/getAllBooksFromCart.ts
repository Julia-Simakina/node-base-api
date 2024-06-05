import { Request, Response, NextFunction } from "express";
import bookRepository from "../../db/bookRepository";
import CustomError from "../../errors/CustomError";
import Book from "../../db/entity/Book";
import cartRepository from "../../db/cartRepository";

export default async function getAllBooksFromCart(
  req: Request,
  res: Response<Book[]>,
  next: NextFunction
) {
  try {
    const id = req.user.id;

    const cart = await cartRepository.find({ where: { userId: id } });

    const booksId = cart.map((item) => item.bookId);

    const books = await bookRepository.findByIds(booksId);

    return res.json(books);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
