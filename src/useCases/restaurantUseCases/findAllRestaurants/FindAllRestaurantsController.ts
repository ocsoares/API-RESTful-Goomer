import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { FindAllRestaurantsUseCase } from "./FindAllRestaurantsUseCase";

export class FindAllRestaurantsController implements IController {
    constructor(
        private readonly getAllRestaurantsUseCase: FindAllRestaurantsUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const allRestaurants = await this.getAllRestaurantsUseCase.execute();

        return res.json({
            message: 'Todos os restaurantes foram encontrados !',
            restaurants: allRestaurants
        });
    }
}