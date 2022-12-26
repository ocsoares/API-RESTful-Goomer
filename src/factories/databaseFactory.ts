import { MongooseODM } from "../config/database";

// Utilizando no arquivo server !!! <<<
const makeMongooseODMFactory = (): MongooseODM => {
    const atlasDatabase = new MongooseODM();
    return atlasDatabase;
};

export const mongooseODM = makeMongooseODMFactory();