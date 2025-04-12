import {Request, Response, NextFunction} from 'express';
import {Role} from '@prisma/client';
import {decodeJwtToken} from '../../modules/auth/utils/jwt';
import {errorResponse, sendResponse} from '../utils/sendResponse';

export const checkRole = (requiredRoles: Role[] | Role) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return sendResponse(
                res,
                401,
                errorResponse('Токен не предоставлен')
            );
        }

        try {
            const decoded = decodeJwtToken(token);

            const rolesArray = Array.isArray(requiredRoles)
                ? requiredRoles
                : [requiredRoles];

            if (!rolesArray.includes(decoded.role)) {
                return sendResponse(
                    res,
                    403,
                    errorResponse('Недостаточно прав доступа')
                );
            }

            req.user = {id: decoded.id, role: decoded.role};

            next();
        } catch (error) {
            return sendResponse(res, 401, errorResponse('Неверный токен'));
        }
    };
};
