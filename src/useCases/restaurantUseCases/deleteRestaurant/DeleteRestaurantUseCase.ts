import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IRestaurant } from "../../../models/IRestaurant";
import { IRestaurantRepository } from "../../../repositories/interfaces/IRestaurantRepository";

export class DeleteRestaurantUseCase implements IUseCase {
    constructor(
        private readonly deleteRestaurantRepository: IRestaurantRepository
    ) { }

    async execute(restaurantId: string): Promise<IRestaurant> {
        try {
            const isValidRestaurant = await this.deleteRestaurantRepository.findById(restaurantId);

            if (!isValidRestaurant) {
                throw new BadRequestAPIError('Restaurante não encontrado !');
            }

            await this.deleteRestaurantRepository.deleteRestaurantById(restaurantId);

            return isValidRestaurant;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Restaurante não encontrado !');
        }
    }
}