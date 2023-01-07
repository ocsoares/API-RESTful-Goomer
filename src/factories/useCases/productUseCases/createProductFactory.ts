import { MongooseProductRepository } from "../../../repositories/implementations/mongoose/MongooseProductRepository";
import { CreateProductController } from "../../../useCases/productUseCases/createProduct/CreateProductController";
import { CreateProductUseCase } from "../../../useCases/productUseCases/createProduct/CreateProductUseCase";

const makeCreateProductFactory = (): CreateProductController => {
    const mongooseProductRepository = new MongooseProductRepository();
    const createProductUseCase = new CreateProductUseCase(mongooseProductRepository);
    const createProductController = new CreateProductController(createProductUseCase);

    return createProductController;
};

export const createProductController = makeCreateProductFactory();