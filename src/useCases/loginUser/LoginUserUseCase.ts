import { IUseCase } from "../../@types/interfaces/IUseCase";
import Logger from "../../config/logs";
import { BadRequestAPIError } from "../../helpers/ErrorAPIHelper";
import { IUser } from "../../models/IUser";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ProtectPassword } from "../../utils/ProtectPasswordUtils";
import { ILoginUserRequest } from "./ILoginUser";

export class LoginUserUseCase implements IUseCase {
    constructor(
        private readonly loginUserRepository: IUserRepository
    ) { }

    async execute(data: ILoginUserRequest): Promise<IUser> {
        const userAlreadyExists = await this.loginUserRepository.findByUsername(data.username);

        if (!userAlreadyExists) {
            throw new BadRequestAPIError('Username ou password inválido !');
        }

        const isValidPassword = await ProtectPassword.comparePassword(data.password, userAlreadyExists.password);

        if (!isValidPassword) {
            Logger.error(`Alguém tentou acessar a conta ${userAlreadyExists.username}, mas sem sucesso !`);
            throw new BadRequestAPIError('Username ou password inválido !');
        }

        return userAlreadyExists;
    }
}