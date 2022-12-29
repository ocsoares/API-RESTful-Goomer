import { Request, Response } from "express";
import { IController } from "../../@types/interfaces/IController";
import { Token } from "../../utils/TokenUtils";
import { ILoginUserRequest } from "./ILoginUser";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController implements IController {
    constructor(
        private readonly loginUserUseCase: LoginUserUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { username, password }: ILoginUserRequest = req.body;

        const userLogged = await this.loginUserUseCase.execute({
            username,
            password
        });

        const token = Token.generate(userLogged, '1h');

        return res.json({
            message: 'Autenticado com sucesso !',
            token
        });
    }
}