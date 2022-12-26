import { body } from 'express-validator';

export const authRegisterValidation = () => {
    return [
        body('username').isString().withMessage('Insira um username válido no formato string !'),
        body('password').isString().withMessage('Insira um password válido no formato string !'),
        body('confirm_password').isString().withMessage('Insira um confirm_password válido no formato string !')
    ];
};