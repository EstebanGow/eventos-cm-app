import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IEventosPostgresRepository, IUsuariosPostgresRepository } from '@domain/repository';
import { IEditarEvento, IEvento, IUsuarioEvento } from '@application/data';
import { IEventoId } from '@application/data/out/IEventoId';
import {
    calcularAsistentes,
    validarCapacidadEvento,
    validarCreacionEvento,
    validarEdicionEvento,
    validarPermisosEventoUsuario,
} from '@domain/services';
import { ApiClient } from '@infrastructure/api-client';
import { ApiClientRest } from '@domain/api';

@injectable()
export class EventosAppService {
    private eventosPostgresqlRepository = DEPENDENCY_CONTAINER.get<IEventosPostgresRepository>(
        TYPES.EventosPostgresRepository,
    );
    private usuariosPostgresqlRepository = DEPENDENCY_CONTAINER.get<IUsuariosPostgresRepository>(
        TYPES.UsuariosPostgresRepository,
    );
    private apiClient = DEPENDENCY_CONTAINER.get<ApiClientRest>(ApiClient);

    async obtenerEventoService(idEvento: number): Promise<Response<string | null>> {
        const response = await this.eventosPostgresqlRepository.obtenerEventos(idEvento);
        return Result.ok(response);
    }

    async eliminarEventoService(idEvento: number): Promise<Response<any | null>> {
        const evento = await this.eventosPostgresqlRepository.obtenerEventos(idEvento);
        if (!evento.length) {
            return Result.error(`no existe el evento ${idEvento}`);
        }
        const idDireccion = evento[0].direccion.id;
        await this.eventosPostgresqlRepository.eliminarEventoTransaccion(idEvento, idDireccion);
        return Result.ok({ message: 'Evento eliminado correctamente' });
    }

    async obtenerEventosService(): Promise<Response<any | null>> {
        const response = await this.eventosPostgresqlRepository.obtenerEventos(null);
        return Result.ok(response);
    }

    async guardarEventoService(data: IEvento): Promise<Response<IEventoId | null>> {
        validarCreacionEvento(data);
        const geoReferenciacion = await this.apiClient.obtenerCoordenadas(data.direccion);
        data.direccion.longitud = geoReferenciacion.longitude;
        data.direccion.latitud = geoReferenciacion.latitude;
        const response = await this.eventosPostgresqlRepository.guardarEventoTransaccion(data);
        return Result.ok({ idEvento: response });
    }

    async editarEventoService(data: IEditarEvento): Promise<Response<any | null>> {
        const evento = await this.eventosPostgresqlRepository.obtenerEventos(data.idEvento);
        validarEdicionEvento(data, evento);
        await this.eventosPostgresqlRepository.editarEventoTransaccion(data);
        return Result.ok({ idEvento: data.idEvento });
    }

    async inscribirUsuarioEventoService(data: IUsuarioEvento): Promise<Response<string | null>> {
        const usuario = await this.usuariosPostgresqlRepository.obtenerUsuario(data.idUsuario);
        const evento = await this.eventosPostgresqlRepository.obtenerEventos(data.idEvento);
        validarPermisosEventoUsuario(usuario, evento);
        validarCapacidadEvento(evento);
        await this.eventosPostgresqlRepository.inscribirUsuarioEvento(data);
        return Result.ok();
    }

    async obtenerMetricasService(): Promise<Response<any | null>> {
        const eventos = await this.eventosPostgresqlRepository.obtenerEventos(null);
        const { asistentesPorDia, totalUsuarios } = calcularAsistentes(eventos);
        return Result.ok({
            dias: asistentesPorDia,
            totalUsuarios: totalUsuarios,
        });
    }
}
