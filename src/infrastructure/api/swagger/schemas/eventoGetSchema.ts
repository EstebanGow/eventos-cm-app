import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty, validationParser } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
import { eventoIdSchema } from '@infrastructure/api/schemas';
export const eventoGetSchema = {
    $id: uuidv4(),
    schema: {
        description: 'consultar un Evento',
        tags: [SwaggerTag.Eventos],
        body: validationParser(eventoIdSchema),
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: [
                        {
                            id: 8,
                            nombre: 'Reunion social',
                            fecha: '2024-10-05',
                            hora_inicio: '10:00:00',
                            hora_fin: '11:00:00',
                            descripcion: 'Reunion Club de golf',
                            capacidad: 5,
                            precio: 20000,
                            tipo_evento: {
                                id: 2,
                                descripcion: 'VIP',
                            },
                            direccion: {
                                id: 10,
                                pais: 'Colombia',
                                ciudad: 'Bello',
                                direccion: 'Calle 20E # 73 71',
                            },
                            usuarios: [],
                            usuarios_inscritos: 0,
                        },
                    ],
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
