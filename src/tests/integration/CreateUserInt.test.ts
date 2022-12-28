import request from 'supertest';
import { app } from '../../app';
import { ICreateUserRequest } from '../../useCases/createUser/ICreateUser';

const createUserURLRoute = '/api/auth/register';

describe("Create User Integration Test", () => {

    it("Should be possible to create a new user", async () => {
        const getResponse = await createUserPostRoute(
            createUserURLRoute,
            'test_user',
            'test_password123',
            'test_password123'
        );

        console.log('getResponse:', getResponse);

        expect(getResponse.statusCode).toBe(201);
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