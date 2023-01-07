import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { ICreateProductRequest } from "./ICreateProduct";

export class CreateProductController implements IController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { ...productData }: ICreateProductRequest = req.body;

        const newProduct = await this.createProductUseCase.execute(productData);

        return res.status(201).json({
            message: 'Produto criado com sucesso !',
            created_product: newProduct
        });
    }
}