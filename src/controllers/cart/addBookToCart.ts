import { Request, Response, NextFunction } from "express";
import cartRepository from "../../db/cartRepository";
import userRepository from "../../db/userRepository";
import bookRepository from "../../db/bookRepository";
import Cart from "../../db/entity/Cart";

export default async function addBookToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.user.id;

    const user = await userRepository.findOne({
      // relations: { cart: true },
      where: { id: Number(id) },
    });

    if (!user) {
      throw Error;
    }

    const { bookId } = req.body;
    const book = await bookRepository.findOne({
      where: { id: Number(bookId) },
    });

    const cart = new Cart();
    cart.user = user;
    cart.book = book;

    await cartRepository.save(cart);

    const userCarts = await cartRepository.find({ where: { userId: id } });

    res.json(userCarts);
  } catch (error) {
    next(error);
  }
}
