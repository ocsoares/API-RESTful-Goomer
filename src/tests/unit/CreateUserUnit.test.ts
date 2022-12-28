// Imports

import { HashPassword } from "../../utils/HashPasswordUtils";


describe('Create User Unit Test', () => {

    it('Should be possible to hash a password', async () => {
        const anyPassword = 'securepassword123';

        const hashedPassword = await HashPassword.protect(anyPassword);
        const comparePassword = await HashPassword.comparePassword(anyPassword, hashedPassword);

        expect(typeof anyPassword).toBe('string');
        expect(typeof hashedPassword).toBe('string');
        expect(comparePassword).toBe(true);
    });
});