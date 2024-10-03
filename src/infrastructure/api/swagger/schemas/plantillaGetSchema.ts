import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
export const plantillaGetSchema = {
    $id: uuidv4(),
    schema: {
        description: 'Obtener plantilla base64',
        tags: [SwaggerTag.Plantillas],
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiZXZlbnRvcyIsImlhdCI6MTcyNzkxMDU0NCwiZXhwIjoxNzI3OTE0MTQ0fQ.A4Ifb_1BRJ0nwi2qdwcPLSfOcDejzPeq-Bm-qVnZgt8',
                    timestamp: '2024-10-02T23:24:12.618Z',
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
