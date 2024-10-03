export interface UsuarioModel {
    id: number;
    nombres: string;
    apellidos: string;
    identificacion: string;
    telefono: string;
    tipo_usuario: TiposUsuario;
}

export interface TiposUsuario {
    id: number;
    descripcion: string;
}
