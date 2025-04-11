import jwt from 'jsonwebtoken';
import {UnauthorizedError} from './errors';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface GenerateTokenPayload {
    sub: string;
    role: string;
}

export const generateToken = ({sub, role}: GenerateTokenPayload) => {
    return jwt.sign({sub, role}, JWT_SECRET, {expiresIn: '30d'});
};

export const decodeJwtToken = (token: string) => {
    try {
        const decoded = jwt.decode(token);
        if (!decoded) {
            throw new UnauthorizedError('Токен невалиден');
        }

        return decoded;
    } catch (error) {
        throw new UnauthorizedError('Ошибка при декодировании токена');
    }
};
