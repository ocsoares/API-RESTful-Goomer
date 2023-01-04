import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { GetAllRestaurantsUseCase } from "./getAllRestaurantsUseCase";

export class GetAllRestaurantsController implements IController {
    constructor(
        private readonly getAllRestaurantsUseCase: GetAllRestaurantsUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const allRestaurants = await this.getAllRestaurantsUseCase.execute();

        return res.json({
            message: 'Todos os restaurantes foram encontrados !',
            restaurants: allRestaurants
        });
    }
}