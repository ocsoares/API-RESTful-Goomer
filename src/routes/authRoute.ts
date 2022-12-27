import { Router } from 'express';
import { createUserController } from '../factories/useCases/createUserFactory';
import { authRegisterValidation } from '../middleware/validation/authRegisterValidation';
import { handleValidation } from '../middleware/validation/handleValidation';

const authRoute = Router();

authRoute.post('/auth/register', authRegisterValidation(), handleValidation, createUserController.handle);

export default authRoute;