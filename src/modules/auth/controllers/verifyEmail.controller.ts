import {Request, Response} from 'express';
import {verifyEmailService} from '../services/verifyEmail.service';
import {
    sendResponse,
    errorResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const {code, email} = req.body;

        if (!code || !email) {
            return sendResponse(
                res,
                400,
                errorResponse('Требуется email и код')
            );
        }

        const result = await verifyEmailService(code, email);
        return sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
