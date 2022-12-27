import { Request, Response } from 'express';
import { IController } from '../../@types/interfaces/IController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { ICreateUserRequest } from './ICreateUser';

export class CreateUserController implements IController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase // Case responsible, in this case, for CREATE a new user !!
    ) { }

    // O createUserUseCase aqui no Controller NÃO instancia se NÃO passar o Request e o Response como
    // PARÂMETRO no handle (funcionando na Rota) !!! <<<
    async handle(req: Request, res: Response): Promise<Response> {
        const { username, password, confirm_password }: ICreateUserRequest = req.body;
        console.log('TESTE CreateUserController:', this.createUserUseCase);

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