import {Request, Response} from 'express';
import {adminRecoveryService} from '../services/adminRecovery.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const adminRecovery = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {email, code, newPassword} = req.body;

    try {
        const result = await adminRecoveryService(email, code, newPassword);
        sendResponse(res, 200, successResponse(result));
        return;
    } catch (err: any) {
        sendResponse(res, err.code || 400, errorResponse(err.message));
        return;
    }
};
