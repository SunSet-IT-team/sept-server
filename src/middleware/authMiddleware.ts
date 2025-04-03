import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({message: 'Нет токена авторизации'});
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: number;
            role: string;
        };

        req.user = {userId: decoded.userId, role: decoded.role};

        next();
    } catch (error) {
        res.status(401).json({message: 'Недействительный токен'});
    }
};
