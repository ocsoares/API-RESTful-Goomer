import { Router } from 'express';
import { authRegisterValidation } from '../middleware/validation/authRegisterValidation';
import { handleValidation } from '../middleware/validation/handleValidation';

const authRoute = Router();

authRoute.post('/auth/register', authRegisterValidation(), handleValidation/*, controller... */);

export default authRoute;