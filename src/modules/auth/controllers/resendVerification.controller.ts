import {Request, Response} from 'express';
import {resendVerificationService} from '../services/resendVerification.service';
import {
    sendResponse,
    errorResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const resendVerification = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {email} = req.body;

        if (!email) {
            sendResponse(res, 400, errorResponse('Email обязателен'));
            return;
        }

        const result = await resendVerificationService(email);

        sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        sendResponse(
            res,
            err.statusCode || 400,
            errorResponse(err.message || 'Ошибка при отправке кода')
        );
    }
};
