// middlewares/roleCheck.ts
import {Request, Response, NextFunction} from 'express';
import {Role} from '@prisma/client';
import {decodeJwtToken} from '../../modules/auth/utils/jwt';

interface JwtPayload {
    sub: string;
    role: Role;
}

export const checkRole = (requiredRole: Role) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({message: 'Токен не предоставлен'});
            return;
        }

        try {
            const decoded = decodeJwtToken(token) as JwtPayload;

            if (decoded.role !== requiredRole) {
                res.status(403).json({
                    message: 'Недостаточно прав для доступа',
                });
            }

            req.user = {id: decoded.sub, role: decoded.role};

            next();
        } catch (error) {
            res.status(401).json({message: 'Неверный токен'});
        }
    };
};
