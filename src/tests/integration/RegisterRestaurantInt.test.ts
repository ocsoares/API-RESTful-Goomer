import request from 'supertest';
import { BadRequestErrorMessages } from '../../@types/errorAPIMessages';
import { app } from '../../app';
import { IRegisterRestaurantRequest } from '../../useCases/restaurantUseCases/registerRestaurant/IRegisterRestaurant';

describe('Register Restaurant Integration Test', () => {
    const registerRestaurantURLRoute = '/api/restaurant';
    const TEST_NAME = 'any_name';
    const TEST_ADDRESS = 'test_address';
    const TEST_BUSINESS_HOURS = 'any_business_hours';

    it('Should be possible to register a new restaurant', async () => {
        const getResponse = await registerRestaurantPostRoute(
            registerRestaurantURLRoute,
            TEST_NAME,
            TEST_ADDRESS,
            TEST_BUSINESS_HOURS
        );

        expect(getResponse.statusCode).toBe(201);
    });

    it('Should NOT be possible to register a new restaurant if name already exists', async () => {
        const getResponse = await registerRestaurantPostRoute(
            registerRestaurantURLRoute,
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
    name: string,
    address: string,
    business_hours: string,
    photo_url?: string,
): Promise<request.Response> {
    const getResponse = await request(app).post(urlRoute).send(<IRegisterRestaurantRequest>{
        name,
        address,
        business_hours,
        photo_url
    });

    return getResponse;
}