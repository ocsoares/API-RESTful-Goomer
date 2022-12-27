import { IUseCase } from "../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../helpers/ErrorAPIHelper";
import { IUser } from "../../models/IUser";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ICreateUserRequest } from "./ICreateUser";

export class CreateUserUseCase implements IUseCase {
    constructor(
        private readonly createUserRepository: IUserRepository  // Repository with database methods
    ) { }

    // ARRUMAR ISSO, fazer do jeito que CRIA e SALVA uma Conta !
    async execute(data: ICreateUserRequest): Promise<IUser> {
        const userAlreadyExists = await this.createUserRepository.findByUsername(data.username);
        console.log('TESTE do CreateUserUseCase', this.createUserRepository);

        if (userAlreadyExists) {
            throw new BadRequestAPIError('Já existe um usuário registrado com esse username !');
        }

        const newUser = this.createUserRepository.create(data);

        return newUser;
    }
}