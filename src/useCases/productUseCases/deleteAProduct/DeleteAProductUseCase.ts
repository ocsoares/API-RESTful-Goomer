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

            const mainInformationOfDeletedProduct: IProduct = {
                photo_url: findProductToReturn.photo_url ? findProductToReturn.photo_url : undefined,
                id: findProductToReturn.id,
                name: findProductToReturn.name,
                category: findProductToReturn.category,
                price: findProductToReturn.price,
                day_and_hour_onsale: findProductToReturn.day_and_hour_onsale ? findProductToReturn.day_and_hour_onsale : undefined as any,
                description_onsale: findProductToReturn.description_onsale ? findProductToReturn.description_onsale : undefined as any,
                new_price_onsale: findProductToReturn.new_price_onsale ? findProductToReturn.new_price_onsale : undefined as any
            };

            return mainInformationOfDeletedProduct;
        }
        catch (error: any) {
            throw new BadRequestAPIError('Produto não encontrado !');
        }
    }
}