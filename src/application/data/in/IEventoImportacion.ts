export interface IEventoImportacion {
    table: string;
    action: string;
    data: Idata;
}

interface Idata {
    id: number;
    nombre_archivo: string;
    fecha_hora_registro: string;
    total_registros: number;
    estado: number;
    registros_fallidos: number;
    registros_exitosos: number;
}
