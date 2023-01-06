import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IRestaurantRepository } from "../../../repositories/interfaces/IRestaurantRepository";

export class FindARestaurantUseCase implements IUseCase {
    constructor(
        private readonly findARestaurantRepository: IRestaurantRepository
    ) { }

    async execute(id: string): Promise<object | object[]> {
        try {
            const searchRestaurantById = await this.findARestaurantRepository.findById(id);

            return searchRestaurantById;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Restaurante não encontrado !');
        }
    }
}