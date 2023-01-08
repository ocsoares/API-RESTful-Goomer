import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { FindAProductUseCase } from "./FindAProductUseCase";
import { IFindAProductRequest } from "./IFindAProduct";

export class FindAProductController implements IController {
    constructor(
        private readonly findAProductUseCase: FindAProductUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id }: IFindAProductRequest = req.params as any;

        const findAProduct = await this.findAProductUseCase.execute(id);

        return res.json({
            message: 'Produto encontrado !',
            product: findAProduct
        });
    }
}