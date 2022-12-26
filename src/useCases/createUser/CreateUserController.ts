import { Request, Response } from 'express';
import { IController } from '../../@types/interfaces/IController';
import { IUser } from '../../models/IUser';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController implements IController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase // Case responsible, in this case, for CREATE a new user !!
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { username, password, confirm_password }: IUser = req.body;

        const createdAccount = await this.createUserUseCase.execute({
            username,
            confirm_password,
            password,
        });

        return res.status(201).json({
            message: 'any message',
            createdAccount
        });
    }
};