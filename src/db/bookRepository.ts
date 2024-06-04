import AppDataSource from "./data-source";
import Book from "./entity/Book";

const bookRepository = AppDataSource.getRepository(Book);

export default bookRepository;
