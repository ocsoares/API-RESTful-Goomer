// NÃO se se precisa fazer um Repository pra Restaurante e um pra Produto, porque 
// o Retorno pode ser Diferente...

import { IRestaurant } from "../../models/IRestaurant";
import { IRegisterRestaurantRequest } from "../../useCases/restaurantUseCases/registerRestaurant/IRegisterRestaurant";

export interface IRestaurantRepository {
    findByName(restaurantName: string): Promise<IRestaurant>;
    findById(id: string): Promise<IRestaurant>;
    createRestaurant(data: IRegisterRestaurantRequest): Promise<IRestaurant>;
    findAllRestaurants(): Promise<Array<IRestaurant>>;
}

export interface IRestaurantProducts {
    findByName(productName: string): Promise<IRestaurantProducts>;
}