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

            const mainInformationOfUpdatedProduct: IProduct = {
                photo_url: updateAProduct.photo_url ? updateAProduct.photo_url : undefined,
                id: updateAProduct.id,
                name: updateAProduct.name,
                category: updateAProduct.category,
                price: updateAProduct.price,
                day_and_hour_onsale: updateAProduct.day_and_hour_onsale ? updateAProduct.day_and_hour_onsale : undefined as any,
                description_onsale: updateAProduct.description_onsale ? updateAProduct.description_onsale : undefined as any,
                new_price_onsale: updateAProduct.new_price_onsale ? updateAProduct.new_price_onsale : undefined as any
            };

            return mainInformationOfUpdatedProduct;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Produto não encontrado !');
        }
    }
}