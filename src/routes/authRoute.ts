import { Request, Response, Router } from 'express';
import { createUserController } from '../factories/useCases/createUserFactory';
import { loginUserController } from '../factories/useCases/loginUserFactory';
import { authLoginValidation } from '../middleware/validation/authLoginValidation';
import { authRegisterValidation } from '../middleware/validation/authRegisterValidation';
import { handleValidation } from '../middleware/validation/handleValidation';

const authRoute = Router();

authRoute.post('/auth/register', authRegisterValidation(), handleValidation, async (req: Request, res: Response) => {
    await createUserController.handle(req, res);
});

authRoute.post('/auth/login', authLoginValidation(), handleValidation, async (req: Request, res: Response) => {
    await loginUserController.handle(req, res);
});

export default authRoute;