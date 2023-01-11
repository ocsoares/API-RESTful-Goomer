import request from 'supertest';
import { Request, Response } from 'express';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { getTokenWithTestUser, testRestaurantBodyReturnFunction } from '../../../utils/testUtilts';
import { deleteRestaurantController } from '../../../factories/useCases/restaurantUseCases/deleteRestaurantFactory';

describe('Delete a restaurant Integration Test', () => {
    const deleteRestaurantURLRoute = '/api/restaurant/';
    const TEST_TOKEN = getTokenWithTestUser();
    const testRestaurantBodyReturn = testRestaurantBodyReturnFunction('Restaurante deletado com sucesso !');

    it('Should be possible to delete a restaurant', async () => {
        const mReq = ({
            params: { id: 'any_id_params' },
            body: {
                ...testRestaurantBodyReturn
            }
        } as unknown) as Request;

        const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;

        try {
            await deleteRestaurantController.handle(mReq, mRes);
        }
        catch (error: any) {
            expect(mReq.body.message).toBe('Restaurante deletado com sucesso !');
            expect(mReq.body.restaurant).toHaveProperty('name');
        }
    });

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