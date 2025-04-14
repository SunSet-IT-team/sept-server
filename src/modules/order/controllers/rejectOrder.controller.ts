import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {rejectOrderService} from '../services/rejectOrder.service';

export const rejectOrder = async (req: Request, res: Response) => {
    try {
        const executorId = Number(req.user?.id);
        const orderId = Number(req.params.id);

        if (!orderId || !executorId) {
            return sendResponse(res, 401, errorResponse('Не авторизован'));
        }

        const result = await rejectOrderService(orderId, executorId);
        return sendResponse(res, 200, successResponse(result));
    } catch (error: any) {
        return sendResponse(res, 400, errorResponse(error.message));
    }
};
