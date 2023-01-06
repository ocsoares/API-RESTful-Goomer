import request from 'supertest';
import { BadRequestErrorMessages } from '../../@types/errorAPIMessages';
import { app } from '../../app';
import { IRegisterRestaurantRequest } from '../../useCases/restaurantUseCases/registerRestaurant/IRegisterRestaurant';
import { getTokenWithTestUser } from '../../utils/testUtilts';

describe('Register Restaurant Integration Test', () => {

    const registerRestaurantURLRoute = '/api/restaurant';
    const TEST_TOKEN = getTokenWithTestUser();
    const TEST_NAME = 'any_name';
    const TEST_ADDRESS = 'test_address';
    const TEST_BUSINESS_HOURS = 'any_business_hours';

    it('Should be possible to register a new restaurant', async () => {
        const getResponse = await registerRestaurantPostRoute(
            registerRestaurantURLRoute,
            TEST_TOKEN,
            TEST_NAME,
            TEST_ADDRESS,
            TEST_BUSINESS_HOURS
        );

        expect(getResponse.statusCode).toBe(201);
    });

    it('Should NOT be possible to register a new restaurant if auth token is wrong', async () => {
        const getResponse = await registerRestaurantPostRoute(
            registerRestaurantURLRoute,
            'wrong_token',
            'other_name',
            TEST_ADDRESS,
            TEST_BUSINESS_HOURS
        );

        expect(getResponse.statusCode).toBe(401);
    });

    it('Should NOT be possible to register a new restaurant if name already exists', async () => {
        const getResponse = await registerRestaurantPostRoute(
            registerRestaurantURLRoute,
            TEST_TOKEN,
            TEST_NAME,
            'other_address',
            'other_business_hours',
        );

        const expectBodyMessage: BadRequestErrorMessages = 'Já existe um restaurante registrado com esse nome !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });
});

async function registerRestaurantPostRoute(
    urlRoute: string,
    token: string,
    name: string,
    address: string,
    business_hours: string,
    photo_url?: string,
): Promise<request.Response> {

    const getResponse = await request(app).post(urlRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(<IRegisterRestaurantRequest>{
            name,
            address,
            business_hours,
            photo_url
        });

    return getResponse;
}