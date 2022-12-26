import { IUser } from "../../models/IUser";

// Default methods to use with any Database
export interface ICreateUserRepository {
    findByUsername(username: string): Promise<IUser>;
    save(toSave: IUser): Promise<void>;
}