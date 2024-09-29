export interface IEvento {
    nombre: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    capacidad: number;
    precio: number;
    descripcion: string;
    tipoEvento: number;
    direccion: IDireccion;
}

export interface IDireccion {
    pais: string;
    ciudad: string;
    direccion: string;
}
