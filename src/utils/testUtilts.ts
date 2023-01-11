import { IProduct } from "../models/IProduct";
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

export const testBodyReturnFunction = (message: string): object => {
    const testBodyReturn = {
        message: message,
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

    return testBodyReturn;
};