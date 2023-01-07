import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../../models/IProduct";
import { IProductRepository } from "../../interfaces/IProductRepository";

const ProductMongooseModel = mongoose.model('product', new Schema<IProduct>({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    onSale: {
        description: { type: String },
        newPrice: { type: Number },
        day_and_hour: { type: String }
    }
},
    {
        timestamps: true
    }
));

export class MongooseProductRepository implements IProductRepository {
    async createProduct(data: IProduct): Promise<IProduct> {
        const newProduct = new ProductMongooseModel(data);
        await newProduct.save();

        return newProduct;
    }
}