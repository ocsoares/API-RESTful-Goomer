import { body } from "express-validator";

export const registerRestaurantValidation = () => {
    return [
        body('name').isString().withMessage('Insira um name válido no formato string !'),
        body('address').isString().withMessage('Insira um address válido no formato string!'),
        body('business_hours').isString().withMessage('Insira um business_hours válido no formato string !')
    ];
};