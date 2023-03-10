import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { IRegisterRestaurantRequest } from "./IRegisterRestaurant";
import { RegisterRestaurantUseCase } from "./RegisterRestaurantUseCase";

export class RegisterRestaurantController implements IController {
    constructor(
        private readonly registerRestaurantUseCase: RegisterRestaurantUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { photo_url, name, address, business_hours }: IRegisterRestaurantRequest = req.body;

        const created_restaurant = await this.registerRestaurantUseCase.execute({
            photo_url,
            name,
            address,
            business_hours
        });

        return res.status(201).json({
            message: 'Restaurante criado com sucesso !',
            created_restaurant: {
                photo_url: created_restaurant.photo_url ? created_restaurant.photo_url : '-',
                name: created_restaurant.name,
                address: created_restaurant.address,
                business_hours: created_restaurant.business_hours
            }
        });
    }
}