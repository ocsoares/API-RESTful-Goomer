import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { IProduct } from "../../../models/IProduct";
import { IUpdateAProductRequest, IUpdateAProductURLParameter } from "./IUpdateAProduct";
import { UpdateAProductUseCase } from "./UpdateAProductUseCase";

export class UpdateAProductController implements IController {
    constructor(
        private readonly updateAProductUseCase: UpdateAProductUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id }: IUpdateAProductURLParameter = req.params as any;
        const { ...bodyData }: IUpdateAProductRequest = req.body;

        const updateData: IProduct = {
            id,
            ...bodyData
        };

        const updateAProduct = await this.updateAProductUseCase.execute(updateData);

        return res.json({
            message: 'Produto atualizado !',
            updated_product: updateAProduct
        });
    }
}