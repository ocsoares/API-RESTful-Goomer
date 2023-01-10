import { MongooseProductRepository } from "../../../repositories/implementations/mongoose/MongooseProductRepository";
import { UpdateAProductController } from "../../../useCases/productUseCases/updateAProduct/UpdateAProductController";
import { UpdateAProductUseCase } from "../../../useCases/productUseCases/updateAProduct/UpdateAProductUseCase";

const makeUpdateAProductFactory = (): UpdateAProductController => {
    const mongooseProductRepository = new MongooseProductRepository();
    const updateAProductUseCase = new UpdateAProductUseCase(mongooseProductRepository);
    const updateAProductController = new UpdateAProductController(updateAProductUseCase);

    return updateAProductController;
};

export const updateAProductController = makeUpdateAProductFactory();