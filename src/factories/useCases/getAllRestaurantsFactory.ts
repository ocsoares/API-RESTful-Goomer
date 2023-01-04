import { MongooseRestaurantRepository } from "../../repositories/implementations/mongoose/MongooseRestaurantRepository";
import { GetAllRestaurantsController } from "../../useCases/restaurantUseCases/getAllRestaurants/getAllRestaurantsController";
import { GetAllRestaurantsUseCase } from "../../useCases/restaurantUseCases/getAllRestaurants/getAllRestaurantsUseCase";

const makeGetAllRestaurantsFactory = (): GetAllRestaurantsController => {
    const mongooseRestaurantRepository = new MongooseRestaurantRepository();
    const getAllRestaurantsUseCase = new GetAllRestaurantsUseCase(mongooseRestaurantRepository);
    const getAllRestaurants = new GetAllRestaurantsController(getAllRestaurantsUseCase);

    return getAllRestaurants;
};

export const getAllRestaurantsController = makeGetAllRestaurantsFactory();