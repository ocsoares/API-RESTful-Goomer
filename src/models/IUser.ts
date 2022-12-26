// Se precisar do id, colocar como readonly !! <<

export interface IUser {
    readonly id?: string; // VER na Prática como colocar esse ID para NÃO dar ERRO !!
    username: string;
    password: string;
    confirm_password: string;
}