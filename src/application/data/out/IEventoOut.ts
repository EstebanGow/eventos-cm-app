export interface IEventoOut {
    id: number;
    nombre: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    capacidad: number;
    precio: number;
    descripcion: string;
    tipoEvento: number;
    direccion: IDireccion;
    lugaresCercanos?: ILugaresCercanos[];
}

export interface IDireccion {
    id: number;
    pais: string;
    ciudad: string;
    direccion: string;
    latitud?: string;
    longitud?: string;
}

export interface ILugaresCercanos {
    nombre: string;
    direccion: string;
    tipo: string;
}
