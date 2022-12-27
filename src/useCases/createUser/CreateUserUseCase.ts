import { IUseCase } from "../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../helpers/ErrorAPIHelper";
import { IUser } from "../../models/IUser";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { HashPassword } from "../../utils/HashPasswordUtils";
import { ICreateUserRequest } from "./ICreateUser";

export class CreateUserUseCase implements IUseCase {
    constructor(
        private readonly createUserRepository: IUserRepository  // Repository with database methods
    ) { }

    async execute(data: ICreateUserRequest): Promise<IUser> {
        const userAlreadyExists = await this.createUserRepository.findByUsername(data.username);
        console.log('TESTE do CreateUserUseCase', this.createUserRepository);

        if (userAlreadyExists) {
            throw new BadRequestAPIError('Já existe um usuário registrado com esse username !');
        }

        if (data.password !== data.confirm_password) {
            throw new BadRequestAPIError('As senhas não coincidem !');
        }

        const protectedPassword = await HashPassword.execute(data.password);

        const newUser = await this.createUserRepository.create({
            username: data.username,
            password: protectedPassword
        });

        return newUser;
    }
}