export interface EstadoProcesoModel {
    id: number;
    nombre_archivo: string;
    estado: string;
    total_registros: number;
    registros_fallidos: number;
    registros_exitosos: number;
    descripcion_fallidos: RegistroFallido[];
}

interface RegistroFallido {
    contenido: string;
    error: string;
}
