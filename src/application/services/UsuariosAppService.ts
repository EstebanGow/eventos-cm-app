import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IUsuariosPostgresRepository } from '@domain/repository';
import { IUsuario } from '@application/data';

@injectable()
export class UsuariosAppService {
    private postgresqlRepository = DEPENDENCY_CONTAINER.get<IUsuariosPostgresRepository>(
        TYPES.UsuariosPostgresRepository,
    );

    async crearUsuarioService(data: IUsuario): Promise<Response<any | null>> {
        const idUsuario = await this.postgresqlRepository.guardarUsuario(data);
        return Result.ok({ idUsuario });
    }

    async obtenerUsuarioService(idUsuario: number): Promise<Response<any | null>> {
        const usuario = await this.postgresqlRepository.obtenerUsuario(idUsuario);
        return Result.ok(usuario);
    }

    async obtenerUsuariosService(): Promise<Response<any | null>> {
        const usuarios = await this.postgresqlRepository.obtenerUsuario(null);
        return Result.ok(usuarios);
    }

    async eliminarUsuarioService(idUsuario: number): Promise<Response<any | null>> {
        const usuarios = await this.postgresqlRepository.eliminarUsuario(idUsuario);
        return Result.ok(usuarios);
    }
}
