import { MongooseRestaurantRepository } from "../../../repositories/implementations/mongoose/MongooseRestaurantRepository";
import { RegisterRestaurantController } from "../../../useCases/restaurantUseCases/registerRestaurant/RegisterRestaurantController";
import { RegisterRestaurantUseCase } from "../../../useCases/restaurantUseCases/registerRestaurant/RegisterRestaurantUseCase";

const makeRegisterRestaurantFactory = (): RegisterRestaurantController => {
    const mongooseRestaurantRepository = new MongooseRestaurantRepository();
    const registerRestaurantUseCase = new RegisterRestaurantUseCase(mongooseRestaurantRepository);
    const registerRestaurantController = new RegisterRestaurantController(registerRestaurantUseCase);

    return registerRestaurantController;
};

export const registerRestaurantController = makeRegisterRestaurantFactory();