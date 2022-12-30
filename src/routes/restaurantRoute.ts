import { Request, Response, Router } from "express";
import { registerRestaurantController } from "../factories/useCases/registerRestaurantFactory";
import { handleValidation } from "../middleware/validation/handleValidation";
import { registerRestaurantValidation } from "../middleware/validation/registerRestaurantValidation";

const restaurantRoute = Router();

restaurantRoute.post('/restaurant', registerRestaurantValidation(), handleValidation, async (req: Request, res: Response) => {
    await registerRestaurantController.handle(req, res);
});

export default restaurantRoute;