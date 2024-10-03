import { IAuteinticar } from '@application/data';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IAutenticacionIPostgresRepository } from '@domain/repository';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Response, Result } from '@domain/response';
import { JWT_SECRET } from '@util';

@injectable()
export class AutenticacionAppService {
    private autenticacionPostgresqlRepository = DEPENDENCY_CONTAINER.get<IAutenticacionIPostgresRepository>(
        TYPES.AutenticacionPostgresRepository,
    );

    async autenticarUsuarioService(data: IAuteinticar): Promise<Response<string | null>> {
        const usuarioAutenticacion = await this.autenticacionPostgresqlRepository.obtenerUsuarioAutenticacion(
            data.usuario,
        );
        if (!usuarioAutenticacion || !(await bcrypt.compare(data.clave, usuarioAutenticacion.clave))) {
            return Result.error('El usuario no existe');
        }
        const token = jwt.sign({ id: usuarioAutenticacion.id, nombre: usuarioAutenticacion.usuario }, JWT_SECRET, {
            expiresIn: '1h',
        });
        return Result.ok(token);
    }
}
