import { IUser } from "../models/IUser";
import { Token } from "./TokenUtils";

export function getTokenWithTestUser() {
    const userData: IUser = {
        id: 'any_id',
        username: 'any_username',
        password: 'any_password'
    };

    const generateToken = Token.generate(userData, '1h');

    return generateToken;
}