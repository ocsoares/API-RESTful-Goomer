import { Request, Response, Router } from "express";
import { createProductController } from "../factories/useCases/productUseCases/createProductFactory";
import { findAllProductsController } from "../factories/useCases/productUseCases/findAllProductsFactory";
import { findAProductController } from "../factories/useCases/productUseCases/findAProductFactory";
import { authMiddleware } from "../middleware/authMiddleware";
import { createProductValidation } from "../middleware/validation/createProductValidation";
import { handleValidation } from "../middleware/validation/handleValidation";

const productRoute = Router();

productRoute.post('/product', authMiddleware, createProductValidation(), handleValidation,
    async (req: Request, res: Response) => {
        await createProductController.handle(req, res);
    }
);

productRoute.get('/product', authMiddleware, async (req: Request, res: Response) => {
    await findAllProductsController.handle(req, res);
});

productRoute.get('/product/:id', authMiddleware, async (req: Request, res: Response) => {
    await findAProductController.handle(req, res);
});

export default productRoute;