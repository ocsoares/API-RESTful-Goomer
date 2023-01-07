import { MongooseRestaurantRepository } from "../../repositories/implementations/mongoose/MongooseRestaurantRepository";
import { DeleteRestaurantController } from "../../useCases/restaurantUseCases/deleteRestaurant/DeleteRestaurantController";
import { DeleteRestaurantUseCase } from "../../useCases/restaurantUseCases/deleteRestaurant/DeleteRestaurantUseCase";

const makeDeleteRestaurantFactory = (): DeleteRestaurantController => {
    const mongooseRestaurantRepository = new MongooseRestaurantRepository();
    const deleteRestaurantUseCase = new DeleteRestaurantUseCase(mongooseRestaurantRepository);
    const deleteRestaurantController = new DeleteRestaurantController(deleteRestaurantUseCase);

    return deleteRestaurantController;
};

export const deleteRestaurantController = makeDeleteRestaurantFactory();