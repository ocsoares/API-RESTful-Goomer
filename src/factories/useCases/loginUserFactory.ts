import { MongooseUserRepository } from "../../repositories/implementations/mongoose/MongooseUserRepository";
import { LoginUserController } from "../../useCases/loginUser/LoginUserController";
import { LoginUserUseCase } from "../../useCases/loginUser/LoginUserUseCase";

const makeLoginUserFactory = (): LoginUserController => {
    const mongooseUserRepository = new MongooseUserRepository();
    const loginUserUseCase = new LoginUserUseCase(mongooseUserRepository);
    const loginUserController = new LoginUserController(loginUserUseCase);
    return loginUserController;
};

export const loginUserController = makeLoginUserFactory();