import { IProduct } from "../models/IProduct";
import { IRestaurant } from "../models/IRestaurant";
import { IUser } from "../models/IUser";
import { Token } from "./TokenUtils";

export function getTokenWithTestUser() {
    const userData: IUser = {
        id: 'any_id',
        username: 'any_username',
        password: 'any_password'
    };

    const generateToken = Token.generate(userData, '1h');

    return generateToken;
}

export const testProductBodyReturnFunction = (message: string): object => {
    const testProductBodyReturn = {
        message,
        product: <IProduct>{
            id: 'any_id',
            photo_url: 'any_photo_url',
            name: 'any_name',
            category: 'any_category',
            price: 120,
            description_onsale: 'any_description_onsale',
            day_and_hour_onsale: 'any_day_and_hour_onsale',
            new_price_onsale: 60
        }
    };

    return testProductBodyReturn;
};

export const testRestaurantBodyReturnFunction = (message: string): object => {
    const testRestaurantBodyReturn = {
        message,
        restaurant: <IRestaurant>{
            id: 'any_id',
            photo_url: 'any_photo_url',
            name: 'any_name',
            address: 'any_address',
            business_hours: 'any_business_hours'
        }
    };

    return testRestaurantBodyReturn;
};