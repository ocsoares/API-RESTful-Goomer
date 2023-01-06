import { Request, Response } from "express";
import { IController } from "../../../@types/interfaces/IController";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IRestaurant } from "../../../models/IRestaurant";
import { IUpdateRestaurantURLParameter } from "./IUpdateRestaurant";
import { UpdateRestaurantUseCase } from "./UpdateRestaurantUseCase";

export class UpdateRestaurantController implements IController {
    constructor(
        private readonly updateRestaurantUseCase: UpdateRestaurantUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id }: IUpdateRestaurantURLParameter = req.params as any;
        const { name, address, business_hours, photo_url }: Omit<IRestaurant, 'id'> = req.body;

        if (!name && !address && !business_hours && !photo_url) {
            throw new BadRequestAPIError('Insira algum dado para alterar no restaurante !');
        }

        const restaurantData: IRestaurant = {
            id,
            name,
            address,
            business_hours,
            photo_url
        };

        const updateRestaurant = await this.updateRestaurantUseCase.execute(restaurantData);

        return res.json({
            message: 'Restaurante atualizado com sucesso !',
            modified_restaurant: updateRestaurant
        });
    }
}