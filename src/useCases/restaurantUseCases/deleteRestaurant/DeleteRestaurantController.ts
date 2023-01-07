import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { DeleteRestaurantUseCase } from "./DeleteRestaurantUseCase";
import { IDeleteRestaurantURLParameter } from "./IDeleteRestaurant";

export class DeleteRestaurantController implements IController {
    constructor(
        private readonly deleteRestaurantUseCase: DeleteRestaurantUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id }: IDeleteRestaurantURLParameter = req.params as any;

        const deleteRestaurantById = await this.deleteRestaurantUseCase.execute(id);

        return res.status(202).json({
            message: 'Restaurante deletado com sucesso !',
            deleted_restaurant: deleteRestaurantById
        });
    }
}