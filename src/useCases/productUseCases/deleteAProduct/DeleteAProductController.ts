import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { DeleteAProductUseCase } from "./DeleteAProductUseCase";
import { IDeleteAProductURLRequest } from "./IDeleteAProduct";

export class DeleteAProductController implements IController {
    constructor(
        private readonly deleteAProductUseCase: DeleteAProductUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id }: IDeleteAProductURLRequest = req.params as any;

        const deleteAProduct = await this.deleteAProductUseCase.execute(id);

        return res.status(202).json({
            message: 'Produto deletado com sucesso !',
            deleted_product: deleteAProduct
        });
    }
}