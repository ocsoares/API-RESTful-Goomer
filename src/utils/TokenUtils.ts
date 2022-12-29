import 'dotenv/config';
import { staticInterfaceMethods } from "./staticInterfaceMethodsUtils";
import { IToken } from "../@types/interfaces/IUtils";
import { IUser } from "../models/IUser";
import jwt from 'jsonwebtoken';

@staticInterfaceMethods<IToken>()
export class Token {
    static generate(user: IUser, expiresIn: string): string {
        const JWT = jwt.sign(<IUser>{
            id: user.id,
            username: user.username
        }, "" + process.env.JWT_HASH as string, {
            expiresIn
        });

        return JWT;
    }
}