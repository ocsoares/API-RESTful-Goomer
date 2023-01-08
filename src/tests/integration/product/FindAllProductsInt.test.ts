import request from 'supertest';
import { UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { getTokenWithTestUser } from '../../../utils/testUtilts';

describe('Find all products Integration Test', () => {
    const urlRoute = '/api/product';
    const TEST_TOKEN = getTokenWithTestUser();

    it('Should be possible to find all products', async () => {
        const getResponse = await findAllProductsGetRoute(
            urlRoute,
            TEST_TOKEN
        );

        expect(getResponse.statusCode).toBe(200);
    });

    it('Should NOT be possible to find all products if auth token is invalid', async () => {
        const getResponse = await findAllProductsGetRoute(
            urlRoute,
            'invalid_token'
        );
        const expectBodyMessage: UnauthorizedErrorMessages = 'Token inválido ou expirado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(401);
    });
});

async function findAllProductsGetRoute(
    urlRoute: string,
    token: string
): Promise<request.Response> {
    const getResponse = await request(app).get(urlRoute)
        .set('Authorization', `Bearer ${token}`);

    return getResponse;
}