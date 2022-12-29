import request from 'supertest';
import { BadRequestErrorMessages } from '../../@types/errorAPIMessages';
import { app } from '../../app';
import { ILoginUserRequest } from '../../useCases/loginUser/ILoginUser';

const loginUserURLRoute = '/api/auth/login';
const TEST_USERNAME = 'test_user';
const TEST_PASSWORD = 'test_password123';

describe('Login User Integration Test', () => {

    // User already created in CreateUser Integration Test !
    it('Should be possible to login with a valid user', async () => {
        const getResponse = await loginUserPostRoute(
            loginUserURLRoute,
            TEST_USERNAME,
            TEST_PASSWORD
        );

        expect(getResponse.statusCode).toBe(200);
    });

    it('Should NOT be possible to login if credentials are invalid', async () => {
        const getResponse = await loginUserPostRoute(
            loginUserURLRoute,
            TEST_USERNAME,
            'wrong_password123'
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Username ou password inválido !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });
});

async function loginUserPostRoute(
    urlRoute: string,
    username: string,
    password: string
): Promise<request.Response> {
    const getResponse = await request(app).post(urlRoute).send(<ILoginUserRequest>{
        username,
        password
    });

    return getResponse;
}