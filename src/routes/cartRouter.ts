import { Router } from "express";
import addBookToCart from "../controllers/cart/addBookToCart";
import getAllBooksFromCart from "../controllers/cart/getAllBooksFromCart";

const cartRouter = Router();

// bookRouter.get("/all", getAllBooks);
cartRouter.post("/add", addBookToCart);
cartRouter.get("/", getAllBooksFromCart);

export default cartRouter;
