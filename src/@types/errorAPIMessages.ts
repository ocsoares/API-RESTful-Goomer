export type BadRequestErrorMessages =
    'Preencha os campos corretamente !' |
    'As senhas não coincidem !' |
    'Já existe um usuário registrado com esse username !' |
    'Username ou password inválido !' |
    'Insira um token válido no authorization !' |
    'ID de transferência inválido !' |
    'Já existe um restaurante registrado com esse nome !' |
    'Restaurante não encontrado !' |
    'Insira algum dado para alterar no restaurante !' |
    'Já existe um produto registrado com esse nome !';

export type UnauthorizedErrorMessages =
    'Token inválido ou expirado !';

export type InternalServerErrorMessage =
    'Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.' |
    'Não foi possível registrar o usuário. Tente novamente mais tarde.' |
    'Não foi possível registrar o restaurante. Tente novamente mais tarde.' |
    'Não foi possível registrar o produto. Tente novamente mais tarde.';