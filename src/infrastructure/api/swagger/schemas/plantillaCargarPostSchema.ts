import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty, validationParser } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
import { cargaMasivaSchema } from '@infrastructure/api/schemas';
export const plantillaCargarPostSchema = {
    $id: uuidv4(),
    schema: {
        description: 'Cargar archivo plantilla',
        tags: [SwaggerTag.Plantillas],
        body: validationParser(cargaMasivaSchema),
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: 'Ejecucion de archivo programada exitosamente.',
                    timestamp: '2024-10-02T06:12:35.575Z',
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
