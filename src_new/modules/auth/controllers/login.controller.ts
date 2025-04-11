import {Request, Response} from 'express';
import {loginService} from '../services/login.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await loginService(req.body);
        res.status(200).json({success: true, ...result});

        sendResponse(res, 200, successResponse(result));
        return;
    } catch (err: any) {
        sendResponse(
            res,
            err.statusCode || 401,
            errorResponse(err.message || 'Ошибка входа')
        );
        return;
    }
};
