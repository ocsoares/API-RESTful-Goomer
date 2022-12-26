import { IUseCase } from "../../@types/interfaces/IUseCase";
import { IUser } from "../../models/IUser";
import { ICreateUserRepository } from "../../repositories/interfaces/ICreateUserRepository";
import { ICreateUserRequest } from "./ICreateUser";

// NOME do ARQUIVO = Case (geralmente o Nome da Pasta) + UseCase !! << 

export class CreateUserUseCase implements IUseCase {
    constructor(
        private readonly createUserRepository: ICreateUserRepository  // Repository with database methods
    ) { }

    async execute(data: ICreateUserRequest): Promise<IUser> {
        const userAlreadyExists = await this.createUserRepository.findByUsername(data.username);

        if (userAlreadyExists) {
            // ERROR !!
            // code....
        }

        const newUser = data;

        await this.createUserRepository.save(newUser);

        return newUser;
    }
}