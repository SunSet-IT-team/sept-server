import {Request, Response} from 'express';
import {login as loginUser} from '../auth/services/login.service';
import {recovery as recoveryPass, getMeService} from './admin.service';
import {getUserIdFromRequest} from '../../helpers/getUserByToken';

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

export async function getMe(req: Request, res: Response) {
    try {
        const id = getUserIdFromRequest(req);

        if (!id) {
            res.status(400).json({
                error: 'Не удалось идентифицировать пользователя',
            });
            return;
        }

        const result = await getMeService({id});

        res.json(result);
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error?.message || 'Произошла ошибка при авторизации',
        });
    }
}
