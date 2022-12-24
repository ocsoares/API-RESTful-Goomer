import { makeMongooseODMFactory } from "../factories/databaseFactory";

beforeAll(async () => {
    const database = makeMongooseODMFactory();

    await database.connection();
});