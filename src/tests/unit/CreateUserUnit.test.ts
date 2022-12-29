import { testMongooseODM } from "../../factories/databaseFactory";
import { ProtectPassword } from "../../utils/ProtectPasswordUtils";

afterAll(async () => {
    await testMongooseODM.clearDatabase();
});

describe('Create User Unit Test', () => {

    it('Should be possible to hash a password', async () => {
        const anyPassword = 'securepassword123';

        const hashedPassword = await ProtectPassword.protect(anyPassword);
        const comparePassword = await ProtectPassword.comparePassword(anyPassword, hashedPassword);

        expect(typeof anyPassword).toBe('string');
        expect(typeof hashedPassword).toBe('string');
        expect(comparePassword).toBe(true);
    });
});