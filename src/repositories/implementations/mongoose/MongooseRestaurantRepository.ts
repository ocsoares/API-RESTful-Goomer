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

        // Could not to use spread because mongoose fails !! <<
        const mainInformationOfRestaurantById: IRestaurant = {
            name: searchRestaurantById.name,
            address: searchRestaurantById.address,
            business_hours: searchRestaurantById.business_hours
        };

        return mainInformationOfRestaurantById;
    }
    async createRestaurant(data: IRegisterRestaurantRequest): Promise<IRestaurant> {
        const newRestaurant = new RestaurantMongooseModel(data);
        await newRestaurant.save();

        return newRestaurant;
    }

    async findAllRestaurants(): Promise<IRestaurant[]> {
        const searchAllRestaurants = await RestaurantMongooseModel.find();

        const mainInformationOfAllRestaurants = searchAllRestaurants.map(prop => ({
            id: prop.id,
            name: prop.name,
            address: prop.address,
            business_hours: prop.business_hours,
        }));

        return mainInformationOfAllRestaurants;
    }

    async updateRestaurant(
        restaurantId: string,
        name: string,
        address: string,
        business_hours: string,
        photo_url: string
    ): Promise<IRestaurant> {
        const searchRestaurant = await RestaurantMongooseModel.findById(restaurantId) as IRestaurant;

        const updatedRestaurant = await RestaurantMongooseModel.findByIdAndUpdate(restaurantId, <Omit<IRestaurant, 'id'>>{
            name: name ? name : searchRestaurant.name,
            address: address ? address : searchRestaurant.address,
            business_hours: business_hours ? business_hours : searchRestaurant.business_hours,
            photo_url: photo_url ? photo_url : searchRestaurant.photo_url
        }) as IRestaurant;

        return updatedRestaurant;
    }

    async deleteRestaurantById(id: string): Promise<void> {
        await RestaurantMongooseModel.deleteOne({ id });
    }
}