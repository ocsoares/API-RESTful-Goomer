import { MongooseProductRepository } from "../../../repositories/implementations/mongoose/MongooseProductRepository";
import { FindAllProductsController } from "../../../useCases/productUseCases/findAllProductsUseCase/FindAllProductsController";
import { FindAllProductsUseCase } from "../../../useCases/productUseCases/findAllProductsUseCase/FindAllProductsUseCase";

const makeFindAllProductsFactory = (): FindAllProductsController => {
    const mongooseProductRepository = new MongooseProductRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(mongooseProductRepository);
    const findAllProductsController = new FindAllProductsController(findAllProductsUseCase);

    return findAllProductsController;
};

export const findAllProductsController = makeFindAllProductsFactory();