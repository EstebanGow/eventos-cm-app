export interface IMetricasOut {
    dias: IDias;
    totalUsuarios: number;
}

interface IDias {
    Lunes: number;
    Martes: number;
    Miercoles: number;
    Jueves: number;
    Viernes: number;
    Sabado: number;
    Domingo: number;
}
