import { IDireccion } from './IEvento';

export interface IEditarEvento {
    idEvento: number;
    nombre: string;
    fechaHora: string;
    direccion: IDireccion;
}
