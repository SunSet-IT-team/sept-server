import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {acceptOrderService} from '../services/acceptOrder.service';

export const acceptOrder = async (req: Request, res: Response) => {
    try {
        const executorId = req.user?.id;
        const orderId = req.params.id;

        if (!orderId || !executorId) {
            return sendResponse(res, 401, errorResponse('Не авторизован'));
        }

        const result = await acceptOrderService(orderId, executorId);
        return sendResponse(res, 200, successResponse(result));
    } catch (error: any) {
        return sendResponse(res, 400, errorResponse(error.message));
    }
};
