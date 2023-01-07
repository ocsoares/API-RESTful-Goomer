import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../../models/IProduct";
import { IProductRepository } from "../../interfaces/IProductRepository";

const ProductMongooseModel = mongoose.model('product', new Schema<IProduct>({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description_onsale: { type: String },
    new_price_onsale: { type: Number },
    day_and_hour_onsale: { type: String }
},
    {
        timestamps: true
    }
));

export class MongooseProductRepository implements IProductRepository {
    async findProductById(id: string): Promise<IProduct> {
        const findProductById = await ProductMongooseModel.findById(id) as IProduct;

        return findProductById;
    }

    async findProductByName(name: string): Promise<IProduct> {
        const findProductByName = await ProductMongooseModel.findOne({ name }) as IProduct;

        return findProductByName;
    }

    async createProduct(data: IProduct): Promise<IProduct> {
        const newProduct = new ProductMongooseModel(data);
        await newProduct.save();

        return newProduct;
    }
}