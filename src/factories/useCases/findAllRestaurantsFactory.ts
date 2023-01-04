import { MongooseRestaurantRepository } from "../../repositories/implementations/mongoose/MongooseRestaurantRepository";
import { FindAllRestaurantsController } from "../../useCases/restaurantUseCases/findAllRestaurants/FindAllRestaurantsController";
import { FindAllRestaurantsUseCase } from "../../useCases/restaurantUseCases/findAllRestaurants/FindAllRestaurantsUseCase";

const makeGetAllRestaurantsFactory = (): FindAllRestaurantsController => {
    const mongooseRestaurantRepository = new MongooseRestaurantRepository();
    const findAllRestaurantsUseCase = new FindAllRestaurantsUseCase(mongooseRestaurantRepository);
    const getAllRestaurants = new FindAllRestaurantsController(findAllRestaurantsUseCase);

    return getAllRestaurants;
};

export const findAllRestaurantsController = makeGetAllRestaurantsFactory();