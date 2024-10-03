import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IUsuariosPostgresRepository } from '@domain/repository';
import { IUsuario } from '@application/data';
import { IUsuarioIdOut } from '@application/data/out/IUsuarioIdOut';
import { UsuarioModel } from '@domain/model';

@injectable()
export class UsuariosAppService {
    private postgresqlRepository = DEPENDENCY_CONTAINER.get<IUsuariosPostgresRepository>(
        TYPES.UsuariosPostgresRepository,
    );

    async crearUsuarioService(data: IUsuario): Promise<Response<IUsuarioIdOut | null>> {
        const idUsuario = await this.postgresqlRepository.guardarUsuario(data);
        return Result.ok({ idUsuario });
    }

    async obtenerUsuarioService(idUsuario: number): Promise<Response<UsuarioModel | null>> {
        const usuario = await this.postgresqlRepository.obtenerUsuario(idUsuario);
        return Result.ok(usuario);
    }

    async obtenerUsuariosService(): Promise<Response<UsuarioModel[] | null>> {
        const usuarios = await this.postgresqlRepository.obtenerUsuarios(null);
        return Result.ok(usuarios);
    }

    async eliminarUsuarioService(idUsuario: number): Promise<Response<IUsuarioIdOut | null>> {
        await this.postgresqlRepository.eliminarUsuario(idUsuario);
        return Result.ok({ idUsuario });
    }
}
