import { body } from "express-validator";

export const createProductValidation = () => {
    return [
        body('name').isString().withMessage('Insira um name válido no formato string !'),
        body('price').isNumeric().withMessage('Insira um price válido no formato number !'),
        body('category').isString().withMessage('Insira um category válido no formato string !'),
        body('description_onsale').isString().withMessage('Insira um description válido no formato string !'),
        body('new_price_onsale').isNumeric().withMessage('Insira um new_price válido no formato string !'),
        body('day_and_hour_onsale').isString().withMessage('Insira um day_and_hour válido no formato string !'),
    ];
};