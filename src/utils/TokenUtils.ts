import 'dotenv/config';
import { staticInterfaceMethods } from "./staticInterfaceMethodsUtils";
import { IToken } from "../@types/interfaces/IUtils";
import { IUser } from "../models/IUser";
import jwt from 'jsonwebtoken';
import { BadRequestAPIError } from '../helpers/ErrorAPIHelper';

export interface ITokenReturn {
    id: string;
    username: string;
}

@staticInterfaceMethods<IToken>()
export class Token {
    static generate(user: IUser, expiresIn: string): string {
        if (!user.id) {
            throw new BadRequestAPIError('Username ou password inválido !');
        }

        const JWT = jwt.sign(<ITokenReturn>{
            id: user.id,
            username: user.username
        }, "" + process.env.JWT_HASH as string, {
            expiresIn
        });

        return JWT;
    }

    static verify(token: string): ITokenReturn | false {
        try {
            const isValidToken = jwt.verify(token, process.env.JWT_HASH as string) as ITokenReturn;

            return isValidToken;
        }
        catch (error: any) {
            return false;
        }
    }
}