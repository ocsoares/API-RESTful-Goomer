import { Request, Response, Router } from "express";
import { createProductController } from "../factories/useCases/productUseCases/createProductFactory";
import { deleteAProductController } from "../factories/useCases/productUseCases/deleteAProductRepository";
import { findAllProductsController } from "../factories/useCases/productUseCases/findAllProductsFactory";
import { findAProductController } from "../factories/useCases/productUseCases/findAProductFactory";
import { updateAProductController } from "../factories/useCases/productUseCases/updateAProductFactory";
import { authMiddleware } from "../middleware/authMiddleware";
import { createProductValidation } from "../middleware/validation/createProductValidation";
import { handleValidation } from "../middleware/validation/handleValidation";
import { updateAProductValidation } from "../middleware/validation/updateAProductValidation";

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

productRoute.patch('/product/:id', authMiddleware, updateAProductValidation(), handleValidation,
    async (req: Request, res: Response) => {
        await updateAProductController.handle(req, res);
    }
);

productRoute.delete('/product/:id', authMiddleware, async (req: Request, res: Response) => {
    await deleteAProductController.handle(req, res);
});

export default productRoute;