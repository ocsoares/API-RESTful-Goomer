import { Request, Response } from 'express';
import { IController } from '../../@types/interfaces/IController';
import { IUseCase } from '../../@types/interfaces/IUseCase';
import { IUser } from '../../models/IUser';
import { MongooseUserRepository } from '../../repositories/implementations/mongoose/MongooseUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController implements IController {
    constructor(
        private readonly createUserUseCase: IUseCase // Case responsible, in this case, for CREATE a new user !!
    ) { }

    // Por algum motivo, o createUserUseCase aqui no Controller NÃO está Instanciando !!!
    async handle(req: Request, res: Response): Promise<Response> {
        const { username, password, confirm_password }: IUser = req.body;
        console.log('TESTE CreateUserController:', this.createUserUseCase);

        // const onlyTest = new CreateUserUseCase(new MongooseUserRepository);

        // const newUser = await onlyTest.execute({
        //     username,
        //     password,
        //     confirm_password
        // });

        const newUser = await this.createUserUseCase.execute({
            username,
            password,
            confirm_password
        });

        return res.status(201).json({
            message: 'Conta criada com sucesso !',
            newUser
        });
    }
};