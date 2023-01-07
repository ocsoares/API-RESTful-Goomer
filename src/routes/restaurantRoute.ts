import { Request, Response, Router } from "express";
import { deleteRestaurantController } from "../factories/useCases/restaurantUseCases/deleteRestaurantFactory";
import { findAllRestaurantsController } from "../factories/useCases/restaurantUseCases/findAllRestaurantsFactory";
import { findARestaurantController } from "../factories/useCases/restaurantUseCases/findARestaurantFactory";
import { registerRestaurantController } from "../factories/useCases/restaurantUseCases/registerRestaurantFactory";
import { updateRestaurantController } from "../factories/useCases/restaurantUseCases/updateRestaurantFactory";
import { authMiddleware } from "../middleware/authMiddleware";
import { handleValidation } from "../middleware/validation/handleValidation";
import { registerRestaurantValidation } from "../middleware/validation/registerRestaurantValidation";
import { updateRestaurantValidation } from "../middleware/validation/updateRestaurantValidation";

const restaurantRoute = Router();

restaurantRoute.post('/restaurant', authMiddleware, registerRestaurantValidation(), handleValidation,
    async (req: Request, res: Response) => {
        await registerRestaurantController.handle(req, res);
    });

restaurantRoute.get('/restaurant', authMiddleware, async (req: Request, res: Response) => {
    findAllRestaurantsController.handle(req, res);
});

restaurantRoute.get('/restaurant/:id', authMiddleware, async (req: Request, res: Response) => {
    await findARestaurantController.handle(req, res);
});

restaurantRoute.patch('/restaurant/:id', authMiddleware, updateRestaurantValidation(), handleValidation,
    async (req: Request, res: Response) => {
        await updateRestaurantController.handle(req, res);
    });

restaurantRoute.delete('/restaurant/:id', authMiddleware, async (req: Request, res: Response) => {
    await deleteRestaurantController.handle(req, res);
});

export default restaurantRoute;