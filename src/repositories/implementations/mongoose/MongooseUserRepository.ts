import mongoose, { Schema } from "mongoose";
import { BadRequestAPIError } from "../../../helpers/ErrorAPIHelper";
import { IUser } from "../../../models/IUser";
import { ICreateUserRequest } from "../../../useCases/createUser/ICreateUser";
import { IUserRepository } from "../../interfaces/IUserRepository";

// IMPORTANTE, se, por exemplo, esse Repositório for sobre Usuários, Fazer TODOS os Métodos rela-
// -cionado, por exemplo, create, delete, find um usuário, etc... !!! <<< 

// IMPORTANTE: Quando for CRIAR um NOVO Usuário, depois de criado, PROCURAR pelo ID para ver se 
// criou mesmo, destruturando o id e checar com if e error !!!

const UserMongooseModel = mongoose.model('user', new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true }
},
    {
        timestamps: true
    }
));

export class MongooseUserRepository implements IUserRepository {
    async findByUsername(username: string): Promise<IUser> {

        const userAlreadyExists = await UserMongooseModel.findOne({ username }) as mongoose.Document & IUser;

        return userAlreadyExists;
    }

    // FAZER o Hash de Senha com Bcrypt !!
    async create(data: ICreateUserRequest): Promise<IUser> {
        if (data.password !== data.confirm_password) {
            throw new BadRequestAPIError('As senhas não coincidem !');
        }

        const newUser = new UserMongooseModel(data);
        const saveUser = newUser.save();

        return saveUser;
    }
}