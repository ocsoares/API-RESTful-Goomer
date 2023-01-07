import request from 'supertest';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { getTokenWithTestUser } from '../../../utils/testUtilts';

describe('Delete a restaurant Integration Test', () => {
    const deleteRestaurantURLRoute = '/api/restaurant/';
    const TEST_TOKEN = getTokenWithTestUser();

    // it('Should be possible to delete a restaurant', async () => {

    // })

    it('Should NOT be possible to delete a restaurant if id is invalid', async () => {
        const getResponse = await deleteRestaurantDeleteRoute(
            deleteRestaurantURLRoute + 'invalid_id',
            TEST_TOKEN
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Restaurante não encontrado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });

    it('Should NOT be possible to delete a restaurant if auth token is invalid', async () => {
        const getResponse = await deleteRestaurantDeleteRoute(
            deleteRestaurantURLRoute + 'any_id',
            'invalid_token'
        );
        const expectBodyMessage: UnauthorizedErrorMessages = 'Token inválido ou expirado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(401);
    });
});

async function deleteRestaurantDeleteRoute(
    urlRoute: string,
    token: string,
): Promise<request.Response> {
    const getResponse = await request(app).delete(urlRoute)
        .set('Authorization', `Bearer ${token}`);

    return getResponse;
}