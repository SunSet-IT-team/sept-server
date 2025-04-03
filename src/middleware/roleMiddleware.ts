import {Response, NextFunction} from 'express';
import {AuthRequest} from './authMiddleware';

export function roleMiddleware(allowedRoles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            res.status(403).json({message: 'Недостаточно прав доступа'});
            return;
        }
        next();
    };
}
