import { MongooseProductRepository } from "../../../repositories/implementations/mongoose/MongooseProductRepository";
import { FindAProductController } from "../../../useCases/productUseCases/findAProduct/findAProductController";
import { FindAProductUseCase } from "../../../useCases/productUseCases/findAProduct/FindAProductUseCase";

const makeFindAProductFactory = (): FindAProductController => {
    const mongooseProductRepository = new MongooseProductRepository();
    const findAProductUseCase = new FindAProductUseCase(mongooseProductRepository);
    const findAProductController = new FindAProductController(findAProductUseCase);

    return findAProductController;
};

export const findAProductController = makeFindAProductFactory();