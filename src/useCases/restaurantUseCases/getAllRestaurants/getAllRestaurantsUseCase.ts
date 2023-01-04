import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { IRestaurantRepository } from "../../../repositories/interfaces/IRestaurantRepository";

export class GetAllRestaurantsUseCase implements IUseCase {
    constructor(
        private readonly getAllRestaurantsRepository: IRestaurantRepository
    ) { }

    async execute(): Promise<object> {
        const getAllRestaurants = await this.getAllRestaurantsRepository.findAllRestaurants();

        return getAllRestaurants;
    }
}