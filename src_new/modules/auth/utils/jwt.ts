import jwt from 'jsonwebtoken';
import {UnauthorizedError} from './errors';
import {Role} from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface GenerateTokenPayload {
    sub: string;
    role: Role;
}

interface DecodedUser {
    sub: string;
    role: Role;
    iat: number;
    exp: number;
}

export const generateToken = ({sub, role}: GenerateTokenPayload) => {
    return jwt.sign({sub, role}, JWT_SECRET, {expiresIn: '30d'});
};

export const decodeJwtToken = (token: string): {id: string; role: Role} => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedUser;

        if (!decoded.sub || !decoded.role) {
            throw new UnauthorizedError('Некорректный токен');
        }

        return {
            id: decoded.sub,
            role: decoded.role,
        };
    } catch (error) {
        throw new UnauthorizedError('Недействительный или истёкший токен');
    }
};
