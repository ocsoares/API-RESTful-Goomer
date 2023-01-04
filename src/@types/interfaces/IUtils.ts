import { IUser } from "../../models/IUser";
import { ITokenReturn } from "../../utils/TokenUtils";

export interface IProtectPassword {
    protect(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export interface IToken {
    generate(user: IUser, expiresIn: string): string;
    verify(token: string): ITokenReturn | false;
}