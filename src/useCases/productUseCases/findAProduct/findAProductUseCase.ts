import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IProduct } from "../../../models/IProduct";
import { IProductRepository } from "../../../repositories/interfaces/IProductRepository";

export class FindAProductUseCase implements IUseCase {
    constructor(
        private readonly findAProductRepository: IProductRepository
    ) { }

    async execute(id: string): Promise<IProduct> {
        try {
            const findAProductById = await this.findAProductRepository.findProductById(id);

            if (!findAProductById) {
                throw new BadRequestAPIError('Produto não encontrado !');
            }

            return findAProductById;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Produto não encontrado !');
        }
    }
}