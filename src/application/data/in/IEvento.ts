export interface IEvento {
    nombre: string;
    fechaHora: string;
    direccion: IDireccion;
}

export interface IDireccion {
    pais: string;
    ciudad: string;
    direccion: string;
}
