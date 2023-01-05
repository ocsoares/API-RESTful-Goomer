import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { IListDataRestaurantURLParameter } from "./IListDataRestaurant";
import { ListDataRestaurantUseCase } from "./ListDataRestaurantUseCase";

export class ListDataRestaurantController implements IController {
    constructor(
        private readonly listDataRestaurantUseCase: ListDataRestaurantUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id }: IListDataRestaurantURLParameter = req.params as any;

        const listDataRestaurant = await this.listDataRestaurantUseCase.execute(id);

        return res.json({
            message: 'Restaurante encontrado !',
            restaurant: listDataRestaurant
        });
    }
}