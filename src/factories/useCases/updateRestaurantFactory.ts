import { MongooseRestaurantRepository } from "../../repositories/implementations/mongoose/MongooseRestaurantRepository";
import { UpdateRestaurantController } from "../../useCases/restaurantUseCases/updateRestaurant/UpdateRestaurantController";
import { UpdateRestaurantUseCase } from "../../useCases/restaurantUseCases/updateRestaurant/UpdateRestaurantUseCase";

const makeUpdateRestaurantFactory = (): UpdateRestaurantController => {
    const mongooseRestaurantRepository = new MongooseRestaurantRepository();
    const updateRestaurantUseCase = new UpdateRestaurantUseCase(mongooseRestaurantRepository);
    const updateRestaurantController = new UpdateRestaurantController(updateRestaurantUseCase);

    return updateRestaurantController;
};

export const updateRestaurantController = makeUpdateRestaurantFactory();