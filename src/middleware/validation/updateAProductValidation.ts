import { body } from "express-validator";

export const updateAProductValidation = () => {
    return [
        body('photo_url').isString().withMessage('Insira um photo_url válido no formato string !'),
        body('name').isString().withMessage('Insira um name válido no formato string !'),
        body('price').isNumeric().withMessage('Insira um price válido no formato number !'),
        body('category').isString().withMessage('Insira um category válido no formato string !'),
        body('description_onsale').isString().withMessage('Insira um description_onsale válido no formato string !'),
        body('new_price_onsale').isNumeric().withMessage('Insira um new_price_onsale válido no formato number !'),
        body('day_and_hour_onsale').isString().withMessage('Insira um day_and_hour_onsale válido no formato string !')
    ];
};