import { IUseCase } from "../../../@types/interfaces/IUseCase";
import { BadRequestAPIError, InternalServerErrorAPI } from "../../../helpers/ErrorAPIHelper";
import { IProduct } from "../../../models/IProduct";
import { IProductRepository } from "../../../repositories/interfaces/IProductRepository";

export class CreateProductUseCase implements IUseCase {
    constructor(
        private readonly createProductRepository: IProductRepository
    ) { }

    async execute(data: IProduct): Promise<IProduct> {
        const productAlreadyExists = await this.createProductRepository.findProductByName(data.name);

        if (productAlreadyExists) {
            throw new BadRequestAPIError('Já existe um produto registrado com esse nome !');
        }

        const newProduct = await this.createProductRepository.createProduct(data);
        const isCreatedProduct = await this.createProductRepository.findProductById(newProduct.id as string);

        if (!isCreatedProduct) {
            throw new InternalServerErrorAPI('Não foi possível registrar o produto. Tente novamente mais tarde.');
        }

        return newProduct;
    }
}