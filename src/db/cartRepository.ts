import AppDataSource from "./data-source";
import Cart from "./entity/Cart";

const cartRepository = AppDataSource.getRepository(Cart);

export default cartRepository;
