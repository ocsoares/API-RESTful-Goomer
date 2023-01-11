import { BadRequestErrorMessages } from "../../../@types/errorAPIMessages";
import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IRestaurant } from "../../../models/IRestaurant";
import { IRestaurantRepository } from "../../../repositories/interfaces/IRestaurantRepository";

export class UpdateRestaurantUseCase implements IUseCase {
    constructor(
        private readonly changeRestaurantRepository: IRestaurantRepository
    ) { }

    async execute(restaurant: IRestaurant): Promise<IRestaurant> {
        try {
            const nameAlreadyExists = await this.changeRestaurantRepository.findByName(restaurant.name);

            if (nameAlreadyExists) {
                throw new BadRequestAPIError('Já existe um restaurante registrado com esse nome !');
            }

            const updateRestaurant = await this.changeRestaurantRepository.updateRestaurant(
                restaurant.id as string,
                restaurant.name,
                restaurant.address,
                restaurant.business_hours,
                restaurant.photo_url as string
            ) as IRestaurant;

            const mainInformationOfUpdatedRestaurant: IRestaurant = {
                id: updateRestaurant.id,
                photo_url: updateRestaurant.photo_url ? updateRestaurant.photo_url : undefined,
                name: updateRestaurant.name,
                address: updateRestaurant.address,
                business_hours: updateRestaurant.business_hours
            };

            return mainInformationOfUpdatedRestaurant;
        }
        catch (error: any) {
            console.log(error.message);
            const errorMessage: BadRequestErrorMessages = 'Já existe um restaurante registrado com esse nome !';

            if (error.message === errorMessage) {
                throw new BadRequestAPIError('Já existe um restaurante registrado com esse nome !');
            }

            throw new BadRequestAPIError('Restaurante não encontrado !');
        }
    }
}