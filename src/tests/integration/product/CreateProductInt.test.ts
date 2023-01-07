import request from 'supertest';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { ICreateProductRequest } from '../../../useCases/productUseCases/createProduct/ICreateProduct';
import { getTokenWithTestUser } from '../../../utils/testUtilts';

describe('Create a new product Integration Test', () => {
    const urlRoute = '/api/product';
    const TEST_TOKEN = getTokenWithTestUser();

    const productData: ICreateProductRequest = {
        name: 'any_name',
        price: 84,
        category: 'any_category',
        description_onsale: 'any_description_onsale',
        new_price_onsale: 125,
        day_and_hour_onsale: 'any_day_and_hour_onsale'
    };

    it('Should be possible to create a new product', async () => {
        const getResponse = await createProductPostRoute(
            urlRoute,
            TEST_TOKEN,
            productData
        );

        expect(getResponse.statusCode).toBe(201);
    });

    it('Should NOT be possible to create a new product if other with same name already exists', async () => {
        const getResponse = await createProductPostRoute(
            urlRoute,
            TEST_TOKEN,
            productData
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Já existe um produto registrado com esse nome !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });

    it('Should NOT be possible to create a new product if auth token is invalid', async () => {
        const getResponse = await createProductPostRoute(
            urlRoute,
            'invalid_token',
            productData
        );
        const expectBodyMessage: UnauthorizedErrorMessages = 'Token inválido ou expirado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(401);
    });
});

async function createProductPostRoute(
    urlRoute: string,
    token: string,
    productData: ICreateProductRequest
): Promise<request.Response> {
    const getResponse = await request(app).post(urlRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(productData);

    return getResponse;
}