import { testMongooseODM } from "../../factories/databaseFactory";
import { IUser } from "../../models/IUser";
import { ProtectPassword } from "../../utils/ProtectPasswordUtils";
import { Token } from "../../utils/TokenUtils";

afterAll(async () => {
    await testMongooseODM.clearDatabase();
});

const anyPassword = 'anypassword123';

describe('Utils Folder Unit Test', () => {
    it('Should be possible to protect a password', async () => {
        const protectedPassword = await ProtectPassword.protect(anyPassword);

        expect(typeof protectedPassword).toBe('string');
    });

    it('Should be possible to compare a password with this password but protected', async () => {
        const hashedPassword = await ProtectPassword.protect(anyPassword);
        const comparePassword = await ProtectPassword.comparePassword(anyPassword, hashedPassword);

        expect(typeof hashedPassword).toBe('string');
        expect(comparePassword).toBe(true);
    });

    it('Should be possible to generate a valid token', async () => {
        const anyUser: IUser = {
            id: 'any_id123',
            username: 'any_username',
            password: 'any_password'
        };

        const token = Token.generate(anyUser, '1h');

        expect(typeof token).toBe('string');
    });
});