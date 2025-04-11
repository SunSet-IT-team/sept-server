import {Request, Response} from 'express';
import {sendVerificationCodeService} from '../services/sendVerificationCode.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const sendVerificationCode = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {email} = req.body;

    try {
        if (!email) {
            sendResponse(res, 400, errorResponse('Поле email обязательно'));
            return;
        }
        const result = await sendVerificationCodeService(email);

        sendResponse(res, 200, successResponse(result));
        return;
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
        return;
    }
};
