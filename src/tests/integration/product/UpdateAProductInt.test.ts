import request from 'supertest';
import { Request, Response } from 'express';
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from '../../../@types/errorAPIMessages';
import { app } from '../../../app';
import { updateAProductController } from '../../../factories/useCases/productUseCases/updateAProductFactory';
import { IUpdateAProductRequest } from '../../../useCases/productUseCases/updateAProduct/IUpdateAProduct';
import { getTokenWithTestUser, testBodyReturnFunction } from '../../../utils/testUtilts';

describe('Update a product Integration Test', () => {
    const urlRoute = '/api/product/';
    const TEST_TOKEN = getTokenWithTestUser();
    const testBodyReturn = testBodyReturnFunction('Produto atualizado !');

    const updateData: IUpdateAProductRequest = {
        photo_url: 'any_photo_url',
        name: 'another_name',
        category: 'any_category',
        price: 10,
        description_onsale: 'any_description_onsale',
        day_and_hour_onsale: 'any_day_and_hour_onsale',
        new_price_onsale: 5
    };

    it('Should be possible to update a product', async () => {
        const mReq = ({
            params: { id: 'any_id_params' },
            body: {
                ...testBodyReturn
            }
        } as unknown) as Request;

        const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;

        try {
            await updateAProductController.handle(mReq, mRes);
        }
        catch (error: any) {
            expect(mReq.body.message).toBe('Produto atualizado !');
            expect(mReq.body.product).toHaveProperty('id');
        }
    });

    it('Should NOT be possible to update a product if id product is invalid', async () => {
        const getResponse = await updateAProductPatchRoute(
            urlRoute,
            'invalid_id',
            TEST_TOKEN,
            updateData
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Produto não encontrado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });

    it('Should NOT be possible to update a product if auth token is invalid', async () => {
        const getResponse = await updateAProductPatchRoute(
            urlRoute,
            'any_id',
            'invalid_auth_token',
            updateData
        );
        const expectBodyMessage: UnauthorizedErrorMessages = 'Token inválido ou expirado !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(401);
    });
});

async function updateAProductPatchRoute(
    urlRoute: string,
    idURLParameter: string,
    token: string,
    { ...updateData }: IUpdateAProductRequest
): Promise<request.Response> {
    const getResponse = await request(app).patch(urlRoute + idURLParameter)
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

    return getResponse;
}