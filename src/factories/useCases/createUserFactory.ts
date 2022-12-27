import { MongooseUserRepository } from "../../repositories/implementations/mongoose/MongooseUserRepository";
import { CreateUserController } from "../../useCases/createUser/CreateUserController";
import { CreateUserUseCase } from "../../useCases/createUser/CreateUserUseCase";

const makeCreateUserFactory = (): CreateUserController => {
    const mongooseUserRepository = new MongooseUserRepository();
    const createUserUseCase = new CreateUserUseCase(mongooseUserRepository);
    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const createUserController = makeCreateUserFactory();