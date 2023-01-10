import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IProduct } from "../../../models/IProduct";
import { IProductRepository } from "../../../repositories/interfaces/IProductRepository";

export class DeleteAProductUseCase implements IUseCase {
    constructor(
        private readonly deleteAProductRepository: IProductRepository
    ) { }

    async execute(id: string): Promise<IProduct> {

        try {
            const findProductToReturn = await this.deleteAProductRepository.findProductById(id);

            if (!findProductToReturn) {
                throw new BadRequestAPIError('Produto não encontrado !');
            }

            await this.deleteAProductRepository.deleteAProductById(id);

            return findProductToReturn;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Produto não encontrado !');
        }
    }
}