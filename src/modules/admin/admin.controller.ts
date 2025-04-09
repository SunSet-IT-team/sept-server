import {Request, Response} from 'express';
import {login as loginUser} from '../auth/services/login.service';
import {recovery as recoveryPass} from './admin.service';

export async function login(req: Request, res: Response) {
    const result = await loginUser(req.body);
    res.json(result);
}
export async function recovery(req: Request, res: Response) {
    try {
        const result = await recoveryPass({
            authorization: req.headers.authorization,
            code: req.body.code,
            newPassword: req.body.newPassword,
            confirmPassword: req.body.confirmPassword,
        });
        res.json(result);
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error?.message || 'Произошла ошибка при авторизации',
        });
    }
}
