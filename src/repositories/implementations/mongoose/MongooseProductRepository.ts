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

    async findAllProducts(): Promise<IProduct[]> {
        const findAllProducts = await ProductMongooseModel.find();

        return findAllProducts;
    }

    async createProduct(data: IProduct): Promise<IProduct> {
        const newProduct = new ProductMongooseModel(data);
        await newProduct.save();

        return newProduct;
    }

    async updateAProduct(data: IProduct): Promise<IProduct> {
        const searchAProduct = await ProductMongooseModel.findById(data.id) as IProduct;

        const updateAProduct = await ProductMongooseModel.findByIdAndUpdate(data.id, <Omit<IProduct, 'id'>>{
            photo_url: data.photo_url ? data.photo_url : searchAProduct.photo_url,
            name: data.name ? data.name : searchAProduct.name,
            category: data.category ? data.category : searchAProduct.category,
            price: data.price ? data.price : searchAProduct.price,
            description_onsale: data.description_onsale ? data.description_onsale : searchAProduct.description_onsale,
            new_price_onsale: data.new_price_onsale ? data.new_price_onsale : searchAProduct.new_price_onsale,
            day_and_hour_onsale: data.day_and_hour_onsale ? data.day_and_hour_onsale : searchAProduct.day_and_hour_onsale
        }) as IProduct;

        return updateAProduct;
    }

    async deleteAProductById(id: string): Promise<void> {
        await ProductMongooseModel.findByIdAndDelete(id);
    }
}