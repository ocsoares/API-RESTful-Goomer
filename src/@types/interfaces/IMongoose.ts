export interface IMongoose {
    connection(): Promise<void>;
    closeConnection(): Promise<void>;
}

export interface ITESTMongoose {
    clearDatabase(): Promise<void>;
}