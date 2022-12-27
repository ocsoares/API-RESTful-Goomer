import { IProtectPassword } from "../@types/interfaces/IProtectPassword";
import { staticInterfaceMethods } from "./staticInterfaceMethodsUtils";
import bcrypt from 'bcrypt';

// The execute method of the IProtectPassword interface NEEDS to be static !
@staticInterfaceMethods<IProtectPassword>()
export class HashPassword {
    static async execute(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
}