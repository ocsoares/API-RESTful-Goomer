import { MongooseRestaurantRepository } from "../../repositories/implementations/mongoose/MongooseRestaurantRepository";
import { ListDataRestaurantController } from "../../useCases/restaurantUseCases/listDataRestaurant/ListDataRestaurantController";
import { ListDataRestaurantUseCase } from "../../useCases/restaurantUseCases/listDataRestaurant/ListDataRestaurantUseCase";

const makeListDataRestaurantFactory = (): ListDataRestaurantController => {
    const mongooseRestaurantRepository = new MongooseRestaurantRepository();
    const listDataRestaurantUseCase = new ListDataRestaurantUseCase(mongooseRestaurantRepository);
    const listDataRestaurantController = new ListDataRestaurantController(listDataRestaurantUseCase);

    return listDataRestaurantController;
};

export const listDataRestaurantController = makeListDataRestaurantFactory();