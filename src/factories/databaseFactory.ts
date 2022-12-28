import { MongooseODM, TESTMongooseODM } from "../config/database";

// Utilizando no arquivo server !!! <<<
const makeMongooseODMFactory = (): MongooseODM => {
    const mongooseODM = new MongooseODM();
    return mongooseODM;
};
export const mongooseODM = makeMongooseODMFactory();

const makeTESTMongooseODm = (): TESTMongooseODM => {
    const testMongooseODM = new TESTMongooseODM;
    return testMongooseODM;
};
export const testMongooseODM = makeTESTMongooseODm();