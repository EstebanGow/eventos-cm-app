import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty, validationParser } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
import { usuarioIdSchema } from '@infrastructure/api/schemas';
export const usuarioGetSchema = {
    $id: uuidv4(),
    schema: {
        description: 'Obtener un usuario',
        tags: [SwaggerTag.Usuarios],
        params: validationParser(usuarioIdSchema),
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: {
                        id: 17,
                        nombres: 'Pancracio',
                        apellidos: 'Hernandez',
                        identificacion: '562211104',
                        telefono: '3201565895',
                        tipo_usuario: {
                            id: 1,
                            descripcion: 'Estandar',
                        },
                    },
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
