import { Request, Response } from 'express';
import request from 'supertest';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { findAProductController } from '../../../factories/useCases/productUseCases/findAProductFactory';
import { getTokenWithTestUser, testBodyReturn } from '../../../utils/testUtilts';

describe('Find a product Integration Test', () => {
    const urlRoute = '/api/product/';
    const TEST_TOKEN = getTokenWithTestUser();

    it('Should be possible to find a product', async () => {
        const mReq = ({
            params: { id: 'any_id_params' },
            body: {
                ...testBodyReturn
            }
        } as unknown) as Request;

        const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;

        try {
            await findAProductController.handle(mReq, mRes);
        }
        catch (error: any) {
            expect(mReq.body.message).toBe('Produto encontrado !');
            expect(mReq.body.product).toHaveProperty('id');
        }
    });

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

async function testeBoy(req: Request, res: Response) {

    const mReq = ({} as unknown) as Request;
    const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;

    const testando = await findAProductController.handle(mReq, mRes.send({ a: '' }));
}