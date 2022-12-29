import { IUser } from "../../models/IUser";

export interface IProtectPassword {
    protect(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export interface IToken {
    generate(user: IUser, expiresIn: string): string;
}