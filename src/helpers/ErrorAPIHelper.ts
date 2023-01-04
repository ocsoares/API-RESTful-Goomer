import { BadRequestErrorMessages, InternalServerErrorMessage, UnauthorizedErrorMessages } from "../@types/errorAPIMessages";

export class ErrorAPIHelper extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
    }
}

export class BadRequestAPIError extends ErrorAPIHelper {
    // O statusCode NÃO entrou no constructor porque, nesse caso, ele vai
    // ser FIXO, e a message vai ser passada como Parâmetro !! <<

    constructor(message: BadRequestErrorMessages) {
        super(message, 400);

        this.name = 'BadRequestError';
    }
}

export class InternalServerErrorAPI extends ErrorAPIHelper {
    constructor(message: InternalServerErrorMessage) {
        super(message, 500);

        this.name = 'InternalServerError';
    }
}

export class UnauthorizedAPIError extends ErrorAPIHelper {
    constructor(message: UnauthorizedErrorMessages) {
        super(message, 401);

        this.name = 'Unauthorized';
    }
}