// object = Type data and promise with a Interface in useCases
export interface IUseCase {
    execute(data: object | string): Promise<object | Array<object>>;
}