import request from 'supertest';
import { BadRequestErrorMessages } from '../../@types/errorAPIMessages';
import { app } from '../../app';
import { ICreateUserRequest } from '../../useCases/createUser/ICreateUser';

describe("Create User Integration Test", () => {
    const createUserURLRoute = '/api/auth/register';
    const TEST_USERNAME = 'test_user';
    const TEST_PASSWORD = 'test_password123';
    const TEST_CONFIRM_PASSWORD = 'test_password123';

    it("Should be possible to create a new user", async () => {
        const getResponse = await createUserPostRoute(
            createUserURLRoute,
            TEST_USERNAME,
            TEST_PASSWORD,
            TEST_CONFIRM_PASSWORD
        );

        expect(getResponse.statusCode).toBe(201);
    });

    it('Should NOT be possible to create a new user if username already exists', async () => {
        const getResponse = await createUserPostRoute(
            createUserURLRoute,
            TEST_USERNAME,
            TEST_PASSWORD,
            TEST_CONFIRM_PASSWORD
        );
        const expectBodyMessage: BadRequestErrorMessages = 'Já existe um usuário registrado com esse username !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });

    it('Should NOT be possible to create a new user if the passwords are different', async () => {
        const getResponse = await createUserPostRoute(
            createUserURLRoute,
            'other_user',
            TEST_PASSWORD,
            'wrong_password'
        );
        const expectBodyMessage: BadRequestErrorMessages = 'As senhas não coincidem !';

        expect(getResponse.body.message).toBe(expectBodyMessage);
        expect(getResponse.statusCode).toBe(400);
    });
});

async function createUserPostRoute(
    urlRoute: string,
    username: string,
    password: string,
    confirm_password: string
): Promise<request.Response> {

    const getResponse = await request(app).post(urlRoute).send(<ICreateUserRequest>{
        username,
        password,
        confirm_password
    });

    return getResponse;
}