import { Request, Response, NextFunction } from 'express';
import { UnauthorizedAPIError } from '../helpers/ErrorAPIHelper';
import { Token } from '../utils/TokenUtils';

interface IAuth {
    authorization: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization }: IAuth = req.headers as any;

    if (!authorization) {
        throw new UnauthorizedAPIError('Token inválido ou expirado !');
    }

    const [, token] = authorization.split(' ');

    const isValidToken = Token.verify(token);

    if (!isValidToken) {
        throw new UnauthorizedAPIError('Token inválido ou expirado !');
    }

    req.token = isValidToken;

    next();
};