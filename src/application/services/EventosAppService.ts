import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IEventosPostgresRepository, IUsuariosPostgresRepository } from '@domain/repository';
import { IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';
import {
    calcularAsistentes,
    validarCapacidadEvento,
    validarCreacionEvento,
    validarCreacionEventoImportacion,
    validarEdicionEvento,
    validarPermisosEventoUsuario,
} from '@domain/services';
import { ApiClientRest } from '@domain/api';
import { IRespuestaEvento } from '@application/data/out/IRespuestaEvento';
import { IEventoOut } from '@application/data/out/IEventoOut';
import { IEventoIdOut } from '@application/data/out/IEventoIdOut';
import { IMensajeOut } from '@application/data/out/IMensajeOut';
import { IMetricasOut } from '@application/data/out/IMetricasOut';
import { RedisEventosRepository } from '@infrastructure/repositories/redis';

@injectable()
export class EventosAppService {
    private eventosPostgresqlRepository = DEPENDENCY_CONTAINER.get<IEventosPostgresRepository>(
        TYPES.EventosPostgresRepository,
    );
    private usuariosPostgresqlRepository = DEPENDENCY_CONTAINER.get<IUsuariosPostgresRepository>(
        TYPES.UsuariosPostgresRepository,
    );
    private apiClient = DEPENDENCY_CONTAINER.get<ApiClientRest>(TYPES.ApiClient);
    private redisClient = DEPENDENCY_CONTAINER.get<RedisEventosRepository>(TYPES.RedisEventosRepository);

    async obtenerEventoService(idEvento: number): Promise<Response<IEventoOut | null>> {
        const evento = await this.eventosPostgresqlRepository.obtenerEvento(idEvento);
        if (evento) {
            const ubicacionesCercanas = await this.apiClient.ubicacionesCercanas(evento);
            evento.lugaresCercanos = ubicacionesCercanas;
        }
        return Result.ok(evento);
    }

    async eliminarEventoService(idEvento: number): Promise<Response<IMensajeOut | null>> {
        const evento = await this.eventosPostgresqlRepository.obtenerEvento(idEvento);
        if (!evento) {
            return Result.error({ mensaje: `no existe el evento ${idEvento}` });
        }
        const idDireccion = evento.direccion.id;
        await this.eventosPostgresqlRepository.eliminarEventoTransaccion(idEvento, idDireccion);
        await this.redisClient.deleteSource(``);
        return Result.ok({ mensaje: 'Evento eliminado correctamente' });
    }

    async obtenerEventosService(): Promise<Response<IEventoOut[] | null>> {
        const eventos = await this.eventosPostgresqlRepository.obtenerEventos(null);
        for (const evento of eventos) {
            const ubicacionesCercanas = await this.apiClient.ubicacionesCercanas(evento);
            evento.lugaresCercanos = ubicacionesCercanas;
        }
        return Result.ok(eventos);
    }

    async guardarEventoService(data: IEvento): Promise<Response<IEventoIdOut | null>> {
        validarCreacionEvento(data);
        const geoReferenciacion = await this.apiClient.obtenerCoordenadas(data.direccion);
        data.direccion.longitud = geoReferenciacion.longitude;
        data.direccion.latitud = geoReferenciacion.latitude;
        const response = await this.eventosPostgresqlRepository.guardarEventoTransaccion(data);
        return Result.ok({ idEvento: response });
    }

    async editarEventoService(data: IEditarEvento): Promise<Response<IEventoIdOut | null>> {
        const evento = await this.eventosPostgresqlRepository.obtenerEvento(data.idEvento);
        validarEdicionEvento(data, evento);
        await this.eventosPostgresqlRepository.editarEventoTransaccion(data);

        return Result.ok({ idEvento: data.idEvento });
    }

    async inscribirUsuarioEventoService(data: IUsuarioEvento): Promise<Response<IMensajeOut | null>> {
        const usuario = await this.usuariosPostgresqlRepository.obtenerUsuario(data.idUsuario);
        const evento = await this.eventosPostgresqlRepository.obtenerEvento(data.idEvento);
        validarPermisosEventoUsuario(usuario, evento);
        console.log('pase')
        validarCapacidadEvento(evento);
        console.log('esta tambien')
        await this.eventosPostgresqlRepository.inscribirUsuarioEvento(data);
        return Result.ok({ mensaje: 'Usuario inscrito al evento de manera exitosa' });
    }

    async obtenerMetricasService(): Promise<Response<IMetricasOut | null>> {
        const eventos = await this.eventosPostgresqlRepository.obtenerEventos(null);
        const { asistentesPorDia, totalUsuarios } = calcularAsistentes(eventos);
        return Result.ok({
            dias: asistentesPorDia,
            totalUsuarios: totalUsuarios,
        });
    }

    async guardarEventoImportacionService(data: IEvento): Promise<IRespuestaEvento> {
        const respuestaValidacion = validarCreacionEventoImportacion(data);
        if (respuestaValidacion.error) {
            return respuestaValidacion;
        }
        const geoReferenciacion = await this.apiClient.obtenerCoordenadas(data.direccion);
        data.direccion.longitud = geoReferenciacion.longitude;
        data.direccion.latitud = geoReferenciacion.latitude;
        await this.eventosPostgresqlRepository.guardarEventoTransaccion(data);
        return { error: false };
    }
}
