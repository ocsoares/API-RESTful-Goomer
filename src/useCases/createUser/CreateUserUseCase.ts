import { IUseCase } from "../../@types/interfaces/IUseCase";
import { BadRequestAPIError, InternalServerErrorAPI } from "../../helpers/ErrorAPIHelper";
import { IUser } from "../../models/IUser";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ProtectPassword } from "../../utils/ProtectPasswordUtils";
import { ICreateUserRequest } from "./ICreateUser";

export class CreateUserUseCase implements IUseCase {
    constructor(
        private readonly createUserRepository: IUserRepository  // Repository with database methods
    ) { }

    async execute(data: ICreateUserRequest): Promise<IUser> {
        const userAlreadyExists = await this.createUserRepository.findByUsername(data.username);

        if (userAlreadyExists) {
            throw new BadRequestAPIError('Já existe um usuário registrado com esse username !');
        }

        if (data.password !== data.confirm_password) {
            throw new BadRequestAPIError('As senhas não coincidem !');
        }

        const protectedPassword = await ProtectPassword.protect(data.password);

        const newUser = await this.createUserRepository.createUser({
            username: data.username,
            password: protectedPassword
        });

        if (!newUser.id) {
            throw new InternalServerErrorAPI('Não foi possível registrar o usuário. Tente novamente mais tarde.');
        }

        const userWasCreated = await this.createUserRepository.findById(newUser.id);

        if (!userWasCreated) {
            throw new InternalServerErrorAPI('Não foi possível registrar o usuário. Tente novamente mais tarde.');
        }

        return newUser;
    }
}