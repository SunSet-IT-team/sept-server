import {Request, Response} from 'express';
import {verifyEmailService} from '../services/verifyEmail.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const verifyEmail = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await verifyEmailService(req.params.code);
        return sendResponse(
            res,
            200,
            successResponse(null, 'Email успешно подтвержден')
        );
    } catch (err: any) {
        return sendResponse(
            res,
            err.statusCode || 500,
            errorResponse(err.message || 'Ошибка верификации')
        );
    }
};
