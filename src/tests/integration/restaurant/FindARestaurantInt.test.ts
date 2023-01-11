import request from 'supertest';
import { Request, Response } from 'express';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { findARestaurantController } from '../../../factories/useCases/restaurantUseCases/findARestaurantFactory';
import { getTokenWithTestUser, testRestaurantBodyReturnFunction } from '../../../utils/testUtilts';

describe('Find a restaurant Integration Test', () => {
    const findARestaurantURLRoute = `/api/restaurant/`;
    const TEST_TOKEN = getTokenWithTestUser();
    const testRestaurantBodyReturn = testRestaurantBodyReturnFunction('Restaurante encontrado !');

    it('Should be possible to find a restaurant', async () => {
        const mReq = ({
            params: { id: 'any_id_params' },
            body: {
                ...testRestaurantBodyReturn
            }
        } as unknown) as Request;

        const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;

        try {
            await findARestaurantController.handle(mReq, mRes);
        }
        catch (error: any) {
            expect(mReq.body.message).toBe('Restaurante encontrado !');
            expect(mReq.body.restaurant).toHaveProperty('name');
        }
    });

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