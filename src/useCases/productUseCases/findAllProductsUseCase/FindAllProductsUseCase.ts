import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { IProduct } from "../../../models/IProduct";
import { IProductRepository } from "../../../repositories/interfaces/IProductRepository";
import { ICreateProductRequest } from "../createProduct/ICreateProduct";

export class FindAllProductsUseCase implements IUseCase {
    constructor(
        private readonly findAllProductsRepository: IProductRepository
    ) { }

    async execute(): Promise<IProduct[]> {
        const findAllProducts = await this.findAllProductsRepository.findAllProducts();

        const mainInformationOfAllProducts = findAllProducts.map(props => (<ICreateProductRequest>{
            photo_url: props.photo_url ? props.photo_url : null as unknown as string,
            name: props.name,
            price: props.price,
            category: props.category,
            description_onsale: props.description_onsale ? props.description_onsale : null as unknown as string,
            new_price_onsale: props.new_price_onsale ? props.new_price_onsale : null as unknown as string,
            day_and_hour_onsale: props.new_price_onsale ? props.new_price_onsale : null as unknown as string
        }));

        return mainInformationOfAllProducts;
    }
}