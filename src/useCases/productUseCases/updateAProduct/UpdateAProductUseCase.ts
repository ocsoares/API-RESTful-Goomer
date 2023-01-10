import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IProduct } from "../../../models/IProduct";
import { IProductRepository } from "../../../repositories/interfaces/IProductRepository";

export class UpdateAProductUseCase implements IUseCase {
    constructor(
        private readonly updateAProductRepository: IProductRepository
    ) { }

    async execute(data: IProduct): Promise<IProduct> {
        const nameAlreadyExists = await this.updateAProductRepository.findProductByName(data.name);

        if (nameAlreadyExists) {
            throw new BadRequestAPIError('Já existe um produto registrado com esse nome !');
        }

        try {
            const updateAProduct = await this.updateAProductRepository.updateAProduct(data);

            return updateAProduct;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Produto não encontrado !');
        }
    }
}