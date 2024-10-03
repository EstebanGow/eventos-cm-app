import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@util';
export const validarToken = (token: string): any => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
};
