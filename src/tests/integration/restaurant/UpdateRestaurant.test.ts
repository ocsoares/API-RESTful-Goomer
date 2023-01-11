import request from 'supertest';
import { Request, Response } from 'express';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { IUpdateRestaurantRequest } from '../../../useCases/restaurantUseCases/updateRestaurant/IUpdateRestaurant';
import { getTokenWithTestUser, testRestaurantBodyReturnFunction } from '../../../utils/testUtilts';
import { updateRestaurantController } from '../../../factories/useCases/restaurantUseCases/updateRestaurantFactory';

describe('Update restaurant Integration Test', () => {
    const updateRestaurantURLRoute = '/api/restaurant/invalid_restaurant';
    const TEST_TOKEN = getTokenWithTestUser();
    const TEST_NAME = 'any_name';
    const TEST_ADDRESS = 'any_address';
    const TEST_BUSINESS_HOURS = 'any_business_hours';
    const TEST_ANY_PHOTO_URL = 'any_photo_url';
    const testRestaurantBodyReturn = testRestaurantBodyReturnFunction('Restaurante atualizado com sucesso !');


    it('Should be possible to update a restaurant', async () => {
        const mReq = ({
            params: { id: 'any_id_params' },
            body: {
                ...testRestaurantBodyReturn
            }
        } as unknown) as Request;

        const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;

        try {
            await updateRestaurantController.handle(mReq, mRes);
        }
        catch (error: any) {
            expect(mReq.body.message).toBe('Restaurante atualizado com sucesso !');
            expect(mReq.body.restaurant).toHaveProperty('id');
        }
    });

    it('Should NOT be possible to update a restaurant if invalid restaurant', async () => {
        const getResponse = await updateRestaurantPostRoute(
            updateRestaurantURLRoute,
            TEST_TOKEN,
            TEST_NAME,
            TEST_ADDRESS,
            TEST_BUSINESS_HOURS,
            TEST_ANY_PHOTO_URL
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Restaurante não encontrado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });

    it('Should NOT be possible to update a restaurant if auth token is invalid', async () => {
        const getResponse = await updateRestaurantPostRoute(
            updateRestaurantURLRoute,
            'invalid_token',
            TEST_NAME,
            TEST_ADDRESS,
            TEST_BUSINESS_HOURS,
            TEST_ANY_PHOTO_URL
        );
        const expectBodyMessage: UnauthorizedErrorMessages = 'Token inválido ou expirado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(401);
    });
});

async function updateRestaurantPostRoute(
    urlRoute: string,
    token: string,
    name: string,
    address: string,
    business_hours: string,
    photo_url: string
): Promise<request.Response> {
    const getResponse = await request(app).get(urlRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(<IUpdateRestaurantRequest>{
            name,
            address,
            business_hours,
            photo_url
        });

    return getResponse;
}