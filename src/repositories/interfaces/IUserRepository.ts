import { IUser } from "../../models/IUser";
import { ICreateUserRequest } from "../../useCases/createUser/ICreateUser";

// Default methods to use with any Database
export interface IUserRepository {
    findByUsername(username: string): Promise<IUser>;
    create(data: IUser): Promise<IUser>;
}