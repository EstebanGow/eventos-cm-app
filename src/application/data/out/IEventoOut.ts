export interface IEventoOut {
    id: number;
    nombre: string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    capacidad: number;
    precio: number;
    descripcion: string;
    tipo_evento: TipoEvento;
    direccion: IDireccion;
    usuarios: Array<string>;
    usuarios_inscritos: number;
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

interface TipoEvento {
    id: number;
    descripcion: string;
}

export interface ILugaresCercanos {
    nombre: string;
    direccion: string;
    tipo: string;
}
