import { IUser } from "../../models/IUser";

export interface IUseCase {
    execute(data: IUser): Promise<IUser>;
}