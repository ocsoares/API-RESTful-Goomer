import { mongooseODM } from "../factories/databaseFactory";

beforeAll(async () => {
    await mongooseODM.connection();
});