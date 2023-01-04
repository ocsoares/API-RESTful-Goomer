import { Request, Response } from 'express';
import { IController } from '../../@types/interfaces/IController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { ICreateUserRequest } from './ICreateUser';

export class CreateUserController implements IController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { username, password, confirm_password }: ICreateUserRequest = req.body;

        const created_account = await this.createUserUseCase.execute({
            username,
            password,
            confirm_password
        });

        return res.status(201).json({
            message: 'Conta criada com sucesso !',
            created_account: {
                username: created_account.username,
                password: created_account.password
            }
        });
    }
};