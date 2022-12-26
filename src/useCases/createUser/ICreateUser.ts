// Essa Interface serve para pegar APENAS a request do usuário, SEM o id !! <<
export interface ICreateUserRequest {
    username: string;
    password: string;
    confirm_password: string;
}