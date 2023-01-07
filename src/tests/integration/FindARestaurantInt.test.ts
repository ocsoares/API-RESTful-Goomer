import request from 'supertest';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../@types/errorAPIMessages';
import { app } from '../../app';
import { getTokenWithTestUser } from '../../utils/testUtilts';

describe('Find a restaurant Integration Test', () => {
    const findARestaurantURLRoute = `/api/restaurant/`;
    const TEST_TOKEN = getTokenWithTestUser();

    // it('Should be possible to find a restaurant', async () => {

    // });

    it('Should be NOT find a restaurant if id is invalid', async () => {
        const getResponse = await findARestaurantGetRoute(
            findARestaurantURLRoute + 'invalid_id',
            TEST_TOKEN
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Restaurante não encontrado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });

    it('Should NOT be possible to find a restaurant if auth token is invalid', async () => {
        const getResponse = await findARestaurantGetRoute(
            findARestaurantURLRoute + 'any_id',
            'invalid_token'
        );
        const expectBodyMessage: UnauthorizedErrorMessages = 'Token inválido ou expirado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(401);
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