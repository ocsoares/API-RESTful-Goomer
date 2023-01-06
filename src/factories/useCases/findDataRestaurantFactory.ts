import { MongooseRestaurantRepository } from "../../repositories/implementations/mongoose/MongooseRestaurantRepository";
import { FindARestaurantController } from "../../useCases/restaurantUseCases/findARestaurant/FindARestaurantController";
import { FindARestaurantUseCase } from "../../useCases/restaurantUseCases/findARestaurant/FindARestaurantUseCase";

const makeListDataRestaurantFactory = (): FindARestaurantController => {
    const mongooseRestaurantRepository = new MongooseRestaurantRepository();
    const findARestaurantUseCase = new FindARestaurantUseCase(mongooseRestaurantRepository);
    const findARestaurantController = new FindARestaurantController(findARestaurantUseCase);

    return findARestaurantController;
};

export const findARestaurantController = makeListDataRestaurantFactory();