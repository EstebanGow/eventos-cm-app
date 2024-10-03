import { DEFAULT_400_ERROR_SCHEMA, DEFAULT_500_ERROR_SCHEMA, beauty, validationParser } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { SwaggerTag } from '@domain/enum';
import { archivoIdSchema } from '@infrastructure/api/schemas';
export const plantillaProcesoGetSchema = {
    $id: uuidv4(),
    schema: {
        description: 'Obtener estado proceso carga plantilla',
        tags: [SwaggerTag.Plantillas],
        params: validationParser(archivoIdSchema),
        response: {
            '200': beauty(
                {
                    isError: false,
                    data: {
                        id: 33,
                        nombre_archivo: 'carga.xlsx',
                        estado: 'Finalizado',
                        total_registros: 2,
                        registros_fallidos: 2,
                        registros_exitosos: 0,
                        descripcion_fallidos: [
                            {
                                error: 'la fecha del evento no puede ser menor a la fecha actual',
                                contenido: {
                                    fecha: '2024-09-12',
                                    nombre: 'Dia de Campo',
                                    precio: 100000,
                                    horaFin: '17:00',
                                    capacidad: 50,
                                    direccion: {
                                        pais: 'Colombia',
                                        ciudad: 'Medellin',
                                        direccion: 'Calle 20E # 73 71',
                                    },
                                    horaInicio: '10:00',
                                    tipoEvento: 1,
                                    descripcion: 'Salida de campo',
                                },
                            },
                        ],
                    },
                },
                'Success response',
            ),
            '400': beauty(DEFAULT_400_ERROR_SCHEMA, 'Bad request'),
            '500': beauty(DEFAULT_500_ERROR_SCHEMA, 'Internal Service Error'),
        },
    },
};
