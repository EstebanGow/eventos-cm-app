import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
export const usuariosPostSchema = {
    $id: uuidv4(),
    schema: {
        description: 'Crear un usuario',
        tags: [SwaggerTag.Usuarios],
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: {
                        idUsuario: 21,
                    },
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
