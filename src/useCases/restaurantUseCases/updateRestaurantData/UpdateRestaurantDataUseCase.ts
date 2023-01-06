import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IRestaurant } from "../../../models/IRestaurant";
import { IRestaurantRepository } from "../../../repositories/interfaces/IRestaurantRepository";

export class UpdateRestaurantDataUseCase implements IUseCase {
    constructor(
        private readonly changeRestaurantDataRepository: IRestaurantRepository
    ) { }

    async execute(restaurant: IRestaurant): Promise<object> {
        const updateRestaurantData = await this.changeRestaurantDataRepository.updateRestaurantData(
            restaurant.id as string,
            restaurant.name,
            restaurant.address,
            restaurant.business_hours,
            restaurant.photo_url as string
        );

        if (!updateRestaurantData) {
            throw new BadRequestAPIError('Restaurante não encontrado !');
        }

        return updateRestaurantData;
    }
}