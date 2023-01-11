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

            const mainInformationOfProduct: IProduct = {
                photo_url: findAProductById.photo_url ? findAProductById.photo_url : undefined,
                id: findAProductById.id,
                name: findAProductById.name,
                category: findAProductById.category,
                price: findAProductById.price,
                day_and_hour_onsale: findAProductById.day_and_hour_onsale ? findAProductById.day_and_hour_onsale : undefined as any,
                description_onsale: findAProductById.description_onsale ? findAProductById.description_onsale : undefined as any,
                new_price_onsale: findAProductById.new_price_onsale ? findAProductById.new_price_onsale : undefined as any
            };

            return mainInformationOfProduct;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Produto não encontrado !');
        }
    }
}