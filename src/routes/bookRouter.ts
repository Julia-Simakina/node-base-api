import { Router } from "express";
import addBook from "../controllers/book/addBook";
import getOneBook from "../controllers/book/getOneBook";
import getAllBooks from "../controllers/book/getAllBooks";

const bookRouter = Router();

bookRouter.get("/all", getAllBooks);
bookRouter.post("/add", addBook);
bookRouter.get("/:id", getOneBook);

export default bookRouter;
