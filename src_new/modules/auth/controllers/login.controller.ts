import {Request, Response} from 'express';
import {loginService} from '../services/login.service';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await loginService(req.body);
        res.status(200).json({success: true, ...result});
        return;
    } catch (err: any) {
        console.error(err);
        res.status(err.statusCode || 401).json({
            success: false,
            message: err.message || 'Ошибка входа',
        });
        return;
    }
};
