import {Request, Response, NextFunction} from 'express';
import {Role} from '@prisma/client';
import {decodeJwtToken} from '../../modules/auth/utils/jwt';

export const checkRole = (requiredRoles: Role[] | Role) => {
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
            const decoded = decodeJwtToken(token);

            const rolesArray = Array.isArray(requiredRoles)
                ? requiredRoles
                : [requiredRoles];

            if (!rolesArray.includes(decoded.role)) {
                res.status(403).json({
                    message: 'Недостаточно прав для доступа',
                });
                return;
            }

            req.user = {id: decoded.id, role: decoded.role};

            next();
        } catch (error) {
            res.status(401).json({message: 'Неверный токен'});
        }
    };
};
