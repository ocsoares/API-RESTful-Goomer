import { Request, Response, Router } from "express";
import { getAllRestaurantsController } from "../factories/useCases/getAllRestaurantsFactory";
import { registerRestaurantController } from "../factories/useCases/registerRestaurantFactory";
import { authMiddleware } from "../middleware/authMiddleware";
import { handleValidation } from "../middleware/validation/handleValidation";
import { registerRestaurantValidation } from "../middleware/validation/registerRestaurantValidation";

const restaurantRoute = Router();

restaurantRoute.post('/restaurant', authMiddleware, registerRestaurantValidation(), handleValidation,
    async (req: Request, res: Response) => {
        await registerRestaurantController.handle(req, res);
    });

restaurantRoute.get('/restaurant', authMiddleware, async (req: Request, res: Response) => {
    getAllRestaurantsController.handle(req, res);
});

export default restaurantRoute;