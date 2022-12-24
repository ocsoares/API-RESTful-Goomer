import { MongooseODM } from "../config/database";

// Utilizando no arquivo server !!! <<<
export const makeMongooseODMFactory = (): MongooseODM => {
    const atlasDatabase = new MongooseODM();
    return atlasDatabase;
};