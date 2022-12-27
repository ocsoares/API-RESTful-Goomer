export interface IProtectPassword {
    execute(password: string): Promise<string>;
}