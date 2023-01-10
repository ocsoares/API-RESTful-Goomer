import request from 'supertest';
import { UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { getTokenWithTestUser } from '../../../utils/testUtilts';

describe('Delete a product Integration Test', () => {
    const urlRoute = '/api/product/';
    const TEST_TOKEN = getTokenWithTestUser();

    // it('Should be possible to delete a product', async () => {

    // });

    it('Should NOT be possible to delete a product if product id is invalid', async () => {
        const getResponse = await deleteAProductDeleteRoute(
            urlRoute,
            'invalid_id',
            TEST_TOKEN
        );

        expect(getResponse.statusCode).toBe(400);
    });

    it('Should NOT be possible to delete a product if auth token is invalid', async () => {
        const getResponse = await deleteAProductDeleteRoute(
            urlRoute,
            'any_id',
            'invalid_authtoken'
        );
        const expectBodyMessage: UnauthorizedErrorMessages = 'Token inválido ou expirado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(401);
    });
});

async function deleteAProductDeleteRoute(
    urlRoute: string,
    urlProductId: string,
    token: string,
): Promise<request.Response> {
    const getResponse = await request(app).delete(urlRoute + urlProductId)
        .set('Authorization', `Bearer ${token}`);

    return getResponse;
}