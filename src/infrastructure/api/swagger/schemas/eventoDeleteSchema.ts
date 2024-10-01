import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty, validationParser } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
import { IEventoIdSchema } from '@infrastructure/api/schemas';
export const eventoDeleteSchema = {
    $id: uuidv4(),
    schema: {
        description: 'Eliminar un Evento',
        tags: [SwaggerTag.Eventos],
        body: validationParser(IEventoIdSchema),
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: {
                        message: 'Evento eliminado correctamente',
                    },
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
