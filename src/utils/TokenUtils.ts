import 'dotenv/config';
import { staticInterfaceMethods } from "./staticInterfaceMethodsUtils";
import { IToken } from "../@types/interfaces/IUtils";
import { IUser } from "../models/IUser";
import jwt from 'jsonwebtoken';
import { BadRequestAPIError } from '../helpers/ErrorAPIHelper';

@staticInterfaceMethods<IToken>()
export class Token {
    static generate(user: IUser, expiresIn: string): string {
        if (!user.id) {
            throw new BadRequestAPIError('Username ou password inválido !');
        }

        const JWT = jwt.sign(<IUser>{
            id: user.id,
            username: user.username
        }, "" + process.env.JWT_HASH as string, {
            expiresIn
        });

        return JWT;
    }
}