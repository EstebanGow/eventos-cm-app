import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
export const metricasEventosGetSchema = {
    $id: uuidv4(),
    schema: {
        description: 'consultar metricas eventos',
        tags: [SwaggerTag.Eventos],
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: {
                        dias: {
                            Sabado: 1,
                            Viernes: 4,
                            Miercoles: 0,
                            Domingo: 0,
                        },
                        totalUsuarios: 5,
                    },
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
