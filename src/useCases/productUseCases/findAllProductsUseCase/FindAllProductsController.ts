import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { FindAllProductsUseCase } from "./FindAllProductsUseCase";

export class FindAllProductsController implements IController {
    constructor(
        private readonly findAllProductsUseCase: FindAllProductsUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const findAllProducts = await this.findAllProductsUseCase.execute();

        return res.json({
            message: 'Todos os produtos foram encontrados !',
            products: findAllProducts
        });
    }
}