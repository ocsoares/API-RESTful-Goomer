import { IProduct } from "../../models/IProduct";

export interface IProductRepository {
    createProduct(data: IProduct): Promise<IProduct>;
}