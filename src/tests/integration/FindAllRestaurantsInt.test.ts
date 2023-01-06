import request from 'supertest';
import { app } from '../../app';
import { getTokenWithTestUser } from '../../utils/testUtilts';

describe('Find all restaurants Integration Test', () => {

    const findAllRestaurantsURLRoute = '/api/restaurant';
    const TEST_TOKEN = getTokenWithTestUser();

    it('Should be possible to find all restaurants', async () => {
        const getResponse = await findAllRestaurantsGetRoute(
            findAllRestaurantsURLRoute,
            TEST_TOKEN
        );

        expect(getResponse.statusCode).toBe(200);
    });

    it('Should NOT be possible to find all restaurants if auth token is wrong', async () => {
        const getResponse = await findAllRestaurantsGetRoute(
            findAllRestaurantsURLRoute,
            'wrong_token'
        );

        expect(getResponse.statusCode).toBe(401);
    });
});

async function findAllRestaurantsGetRoute(
    urlRoute: string,
    token: string
): Promise<request.Response> {
    const getResponse = await request(app).get(urlRoute)
        .set('Authorization', `Bearer ${token}`);

    return getResponse;
}