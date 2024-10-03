import { IEventoOut } from "@application/data/out/IEventoOut";

export const respuestaServiceMock = {
    isError: false,
    data: {
        id: 1,
        nombre: 'Dia de Campo',
        fecha: '2024-09-12',
        hora_inicio: '10:00:00',
        hora_fin: '17:00:00',
        descripcion: 'Salida de campo',
        capacidad: 50,
        precio: 100000,
        tipo_evento: {
            id: 1,
            descripcion: 'Abierto',
        },
        direccion: {
            id: 1,
            pais: 'Colombia',
            ciudad: 'Bello',
            direccion: 'Calle 20E # 73 71',
        },
        usuarios: [],
        usuarios_inscritos: 0,
        lugaresCercanos: [
            {
                nombre: 'Hotel Faranda Bolívar Cúcuta, a member of Radisson Individuals',
                direccion: 'Avenida Demetrio Mendoza, Puente San Luis',
                tipo: 'lodging, point_of_interest, establishment',
            },
            {
                nombre: 'Hotel Mío Boutique',
                direccion: 'Diagonal 11 E #5A - 35',
                tipo: 'lodging, point_of_interest, establishment',
            },
        ],
    },
};

export const responseValidarTokenMOck = { id: 1, nombre: 'eventos', iat: 1727964765, exp: 1727968365 };

export const respuestaEventoRepositoryMock: IEventoOut = {
    id: 1,
    nombre: 'Dia de Campo',
    fecha: '2024-09-12',
    hora_inicio: '10:00:00',
    hora_fin: '17:00:00',
    descripcion: 'Salida de campo',
    capacidad: 50,
    precio: 100000,
    tipo_evento: {
        id: 1,
        descripcion: 'Abierto',
    },
    direccion: {
        id: 1,
        pais: 'Colombia',
        ciudad: 'Bello',
        direccion: 'Calle 20E # 73 71',
    },
    usuarios: [],
    usuarios_inscritos: 0,
};
