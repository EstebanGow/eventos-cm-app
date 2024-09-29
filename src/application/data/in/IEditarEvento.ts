import { IDireccion } from './IEvento';

export interface IEditarEvento {
    idEvento: number;
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
