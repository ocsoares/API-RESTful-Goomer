import request from 'supertest';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { getTokenWithTestUser } from '../../../utils/testUtilts';

describe('Find a product Integration Test', () => {
    const urlRoute = '/api/product/';
    const TEST_TOKEN = getTokenWithTestUser();

    // it('Should be possible to find a product', async () => {

    // })

    it('Should NOT be possible to find a product if id is invalid', async () => {
        const getResponse = await findAProductGetRoute(
            urlRoute,
            'invalid_id',
            TEST_TOKEN
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Produto não encontrado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });

    it('Should NOT be possible to find a product if auth token is invalid', async () => {
        const getResponse = await findAProductGetRoute(
            urlRoute,
            'any_id',
            'invalid_authtoken'
        );
        const expectBodyMessage: UnauthorizedErrorMessages = 'Token inválido ou expirado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(401);
    });
});

async function findAProductGetRoute(
    urlRoute: string,
    idURLParameter: string,
    token: string
): Promise<request.Response> {
    const getResponse = await request(app).get(urlRoute + idURLParameter)
        .set('Authorization', `Bearer ${token}`);

    return getResponse;
}