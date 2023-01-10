import { MongooseProductRepository } from "../../../repositories/implementations/mongoose/MongooseProductRepository";
import { DeleteAProductController } from "../../../useCases/productUseCases/deleteAProduct/DeleteAProductController";
import { DeleteAProductUseCase } from "../../../useCases/productUseCases/deleteAProduct/DeleteAProductUseCase";

const makeDeleteAProductRepository = (): DeleteAProductController => {
    const mongooseProductRepository = new MongooseProductRepository();
    const deleteAProductUseCase = new DeleteAProductUseCase(mongooseProductRepository);
    const deleteAProductController = new DeleteAProductController(deleteAProductUseCase);

    return deleteAProductController;
};

export const deleteAProductController = makeDeleteAProductRepository();