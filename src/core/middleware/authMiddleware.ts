import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {sendResponse, errorResponse} from '../utils/sendResponse';
import {decodeJwtToken} from '../../modules/auth/utils/jwt';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendResponse(res, 401, errorResponse('Требуется авторизация'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = decodeJwtToken(token);

        req.user = {
            id: user.id,
            role: user.role,
        };

        next();
    } catch (err) {
        return sendResponse(res, 401, errorResponse('Недействительный токен'));
    }
};
