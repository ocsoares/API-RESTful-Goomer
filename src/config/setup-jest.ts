import { mongooseODM, testMongooseODM } from "../factories/databaseFactory";

beforeAll(async () => {
    await testMongooseODM.connection();
});