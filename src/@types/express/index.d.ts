declare namespace Express {
    interface Request {
        token: {
            id: string;
            username: string;
        };
    }
}