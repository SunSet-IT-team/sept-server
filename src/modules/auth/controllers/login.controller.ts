import {Request, Response} from 'express';
import {loginService} from '../services/login.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';
import {extractRoleFromUrl} from '../utils/extractRoleFromUrl';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const expectedRole = extractRoleFromUrl(req.originalUrl);

        const result = await loginService(req.body, expectedRole);

        sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        sendResponse(
            res,
            err.statusCode || 401,
            errorResponse(err.message || 'Ошибка входа')
        );
    }
};
