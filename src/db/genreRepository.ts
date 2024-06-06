import AppDataSource from "./data-source";
import Genre from "./entity/Genre";

const genreRepository = AppDataSource.getRepository(Genre);

export default genreRepository;
