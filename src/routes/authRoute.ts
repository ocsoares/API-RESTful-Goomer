import { Request, Response, Router } from 'express';
import { createUserController } from '../factories/useCases/createUserFactory';
import { authRegisterValidation } from '../middleware/validation/authRegisterValidation';
import { handleValidation } from '../middleware/validation/handleValidation';

const authRoute = Router();

authRoute.post('/auth/register', authRegisterValidation(), handleValidation, async (req: Request, res: Response) => {
    await createUserController.handle(req, res);
});

export default authRoute;