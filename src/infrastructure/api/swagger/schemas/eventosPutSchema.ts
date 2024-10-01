import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty, validationParser } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
import { IEditarEventoSchema } from '@infrastructure/api/schemas/IEditarEventoSchema';
export const eventosPutSchema = {
    $id: uuidv4(),
    schema: {
        description: 'Editar un evento',
        tags: [SwaggerTag.Eventos],
        body: validationParser(IEditarEventoSchema),
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: {
                        idEvento: 21,
                    },
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
