import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IRestaurantRepository } from "../../../repositories/interfaces/IRestaurantRepository";

export class ListDataRestaurantUseCase implements IUseCase {
    constructor(
        private readonly listDataRestaurantRepository: IRestaurantRepository
    ) { }

    async execute(id: string): Promise<object | object[]> {
        try {
            const searchRestaurantById = await this.listDataRestaurantRepository.findById(id);

            return searchRestaurantById;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Restaurante não encontrado !');
        }
    }
}