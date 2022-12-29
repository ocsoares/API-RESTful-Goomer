import { body } from "express-validator";

export const authLoginValidation = () => {
    return [
        body('username').isString().withMessage('Insira um username válido no formato string !'),
        body('password').isString().withMessage('Insira um password válido no formato string !')
    ];
};