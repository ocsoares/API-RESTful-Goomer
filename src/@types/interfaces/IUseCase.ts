// object = Type data and promise with a Interface in useCases
export interface IUseCase {
    execute(data: object): Promise<object>;
}