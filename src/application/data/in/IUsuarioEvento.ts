export interface IUsuarioEvento {
    idEvento: number;
    usuario: IUsuario;
}

export interface IUsuario {
    nombres: string;
    apellidos: string;
    identificacion: string;
    telefono: string;
}
