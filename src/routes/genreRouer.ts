import { Router } from "express";
import addGenre from "../controllers/genre/addGenre";
import getAllGenre from "../controllers/genre/getAllGenre";

const genreRouter = Router();

genreRouter.post("/add", addGenre);
genreRouter.get("/all", getAllGenre);

export default genreRouter;
