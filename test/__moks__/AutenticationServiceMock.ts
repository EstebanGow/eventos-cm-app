import { IAuteinticar } from '@application/data';
import { JWT_SECRET } from '@util';
import jwt from 'jsonwebtoken';
export class AutenticacionAppService {
    async autenticarUsuarioService(_data: IAuteinticar) {
        const usuarioAutenticacion = { id: 1, usuario: 'eventos', clave: 'eventos' };
        const token = jwt.sign({ id: usuarioAutenticacion.id, nombre: usuarioAutenticacion.usuario }, JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    }
}
