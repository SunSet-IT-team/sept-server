import jwt from 'jsonwebtoken';
import {UnauthorizedError} from './errors';
import {Role} from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface GenerateTokenPayload {
    sub: number;
    role: Role;
}

interface DecodedUser {
    sub: number;
    role: Role;
    iat: number;
    exp: number;
}

export const generateToken = ({sub, role}: GenerateTokenPayload) => {
    return jwt.sign({sub, role}, JWT_SECRET, {expiresIn: '30d'});
};
export const decodeJwtToken = (token: string): {id: number; role: Role} => {
    if (!token) throw new UnauthorizedError('Токен не предоставлен');

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as DecodedUser;

        if (!decoded.sub || !decoded.role) {
            throw new UnauthorizedError('Некорректный токен');
        }

        return {
            id: decoded.sub,
            role: decoded.role,
        };
    } catch {
        throw new UnauthorizedError('Недействительный или истёкший токен');
    }
};
