import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { IFindARestaurantURLParameter } from "./IFindARestaurant";
import { FindARestaurantUseCase } from "./FindARestaurantUseCase";

export class FindARestaurantController implements IController {
    constructor(
        private readonly findARestaurantUseCase: FindARestaurantUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id }: IFindARestaurantURLParameter = req.params as any;

        const listDataRestaurant = await this.findARestaurantUseCase.execute(id);

        return res.json({
            message: 'Restaurante encontrado !',
            restaurant: listDataRestaurant
        });
    }
}