import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError, InternalServerErrorAPI } from "../../../helpers/ErrorAPIHelper";
import { IRestaurant } from "../../../models/IRestaurant";
import { IRestaurantRepository } from "../../../repositories/interfaces/IRestaurantRepository";
import { IRegisterRestaurantRequest } from "./IRegisterRestaurant";

export class RegisterRestaurantUseCase implements IUseCase {
    constructor(
        private readonly registerRestaurantRepository: IRestaurantRepository
    ) { }

    async execute(data: IRegisterRestaurantRequest): Promise<IRestaurant> {
        const restaurantAlreadyExists = await this.registerRestaurantRepository.findByName(data.name);

        if (restaurantAlreadyExists) {
            throw new BadRequestAPIError('Já existe um restaurante registrado com esse nome !');
        }

        const newRestaurant = await this.registerRestaurantRepository.createRestaurant(data);

        const restaurantWasCreated = await this.registerRestaurantRepository.findById(newRestaurant.id);

        if (!restaurantWasCreated) {
            throw new InternalServerErrorAPI('Não foi possível registrar o restaurante. Tente novamente mais tarde.');
        }

        return newRestaurant;
    }
}