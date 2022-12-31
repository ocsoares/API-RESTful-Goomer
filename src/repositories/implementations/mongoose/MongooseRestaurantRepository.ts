import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "../../../models/IRestaurant";
import { IRegisterRestaurantRequest } from "../../../useCases/restaurantUseCases/registerRestaurant/IRegisterRestaurant";
import { IRestaurantRepository } from "../../interfaces/IRestaurantRepository";

const RestaurantMongooseModel = mongoose.model('restaurant', new Schema<IRestaurant>({
    photo_url: { type: String },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    business_hours: { type: String, required: true }
},
    {
        timestamps: true
    }
));

export class MongooseRestaurantRepository implements IRestaurantRepository {
    async findByName(restaurantName: string): Promise<IRestaurant> {
        const searchRestaurantByName = await RestaurantMongooseModel.findOne({ name: restaurantName }) as IRestaurant;

        return searchRestaurantByName;
    }
    async findById(id: string): Promise<IRestaurant> {
        const searchRestaurantById = await RestaurantMongooseModel.findById(id) as IRestaurant;

        return searchRestaurantById;
    }
    async createRestaurant(data: IRegisterRestaurantRequest): Promise<IRestaurant> {
        const newRestaurant = new RestaurantMongooseModel(data);
        await newRestaurant.save();

        return newRestaurant;
    }
}