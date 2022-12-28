export interface IProtectPassword {
    protect(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}