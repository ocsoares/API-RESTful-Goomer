import request from 'supertest';
import { BadRequestErrorMessages } from '../../@types/errorAPIMessages';
import { app } from '../../app';
import { getTokenWithTestUser } from '../../utils/testUtilts';

describe('Find a restaurant Integration Test', () => {
    const findARestaurantURLRoute = `/api/restaurant/COLOCAR O CERTO QUANDO FOR FAZER`;
    const findARestaurantURLRouteWrongParameter = '/api/restaurant/invalid_restaurant';
    const TEST_TOKEN = getTokenWithTestUser();

    // it('Should be possible to find a restaurant', async () => {

    // });

    it('Should be NOT find a restaurant', async () => {
        const getResponse = await findARestaurantGetRoute(
            findARestaurantURLRouteWrongParameter,
            TEST_TOKEN
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Restaurante não encontrado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });
});

async function findARestaurantGetRoute(
    urlRoute: string,
    token: string
): Promise<request.Response> {
    const getResponse = await request(app).get(urlRoute)
        .set('Authorization', `Bearer ${token}`);

    return getResponse;
}