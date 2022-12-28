import 'dotenv/config';
import mongoose from 'mongoose';
import { IMongoose, ITESTMongoose } from '../@types/interfaces/IMongoose';
import { IUser } from '../models/IUser';
import Logger from './logs';

export class MongooseODM implements IMongoose {
    private readonly _atlasURLConnection = process.env.ATLAS_URL_CONNECTION as string;

    async connection(): Promise<void> {
        try {
            mongoose.set('strictQuery', true);

            await mongoose.connect(this._atlasURLConnection);
            Logger.info('Conectado com sucesso ao Atlas !');
        }
        catch (error: any) {
            Logger.error(error);
            Logger.error('Não foi possível conectar ao Atlas !');
            process.exit(1);
        }
    }

    async closeConnection(): Promise<void> {
        await mongoose.connection.close();
    }
}

export class TESTMongooseODM implements IMongoose, ITESTMongoose {
    private readonly _TESTAtlasURLConnection = process.env.TEST_ATLAS_URL_CONNECTION as string;

    async connection(): Promise<void> {
        try {
            mongoose.set('strictQuery', true);

            await mongoose.connect(this._TESTAtlasURLConnection);
            Logger.info('Conectado com sucesso ao Atlas de TESTE !');
        }
        catch (error: any) {
            Logger.error(error);
            Logger.error('Não foi possível conectar ao Atlas de TESTE !');
            process.exit(1);
        }
    }

    async closeConnection(): Promise<void> {
        await mongoose.connection.close();
    }

    async clearDatabase(): Promise<void> {
        try {
            await mongoose.connection.dropDatabase();
            Logger.info('Banco de dados de TESTE deletado com sucesso !');
        }
        catch (error: any) {
            Logger.error(error);
            Logger.error('Não foi possível deletar o Banco de dados TESTE !');
            process.exit(1);
        }
    }
}