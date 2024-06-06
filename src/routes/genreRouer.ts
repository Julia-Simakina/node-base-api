import { Router } from "express";
import addGenre from "../controllers/genre/addGenre";

const genreRouter = Router();

genreRouter.post("/add", addGenre);

export default genreRouter;
