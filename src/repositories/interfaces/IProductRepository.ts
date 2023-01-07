import { IProduct } from "../../models/IProduct";

export interface IProductRepository {
    findProductById(id: string): Promise<IProduct>;
    findProductByName(name: string): Promise<IProduct>;
    findAllProducts(): Promise<Array<IProduct>>;
    createProduct(data: IProduct): Promise<IProduct>;
}