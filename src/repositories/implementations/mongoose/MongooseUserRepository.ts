import mongoose, { Schema } from "mongoose";
import { IUser } from "../../../models/IUser";
import { ICreateUserRequest } from "../../../useCases/createUser/ICreateUser";
import { IUserRepository } from "../../interfaces/IUserRepository";

const UserMongooseModel = mongoose.model('user', new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
    {
        timestamps: true
    }
));

export class MongooseUserRepository implements IUserRepository {
    async findByUsername(username: string): Promise<IUser> {
        const searchUserByUsername = await UserMongooseModel.findOne({ username }) as IUser;

        return searchUserByUsername;
    }

    async findById(id: string): Promise<IUser> {
        const searchUserById = await UserMongooseModel.findById(id) as IUser;

        return searchUserById;
    }

    async createUser(data: ICreateUserRequest): Promise<IUser> {
        const newUser = new UserMongooseModel(data);
        await newUser.save();

        return newUser;
    }

}