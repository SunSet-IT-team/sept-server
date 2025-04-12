import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {deleteOrderService} from '../services/deleteOrder.service';

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const role = req.user?.role;
        const orderId = req.params.id;

        if (!orderId || !userId || !role) {
            return sendResponse(res, 401, errorResponse('Не авторизован'));
        }

        const result = await deleteOrderService(orderId, userId, role);
        return sendResponse(res, 200, successResponse(result));
    } catch (error: any) {
        return sendResponse(res, 400, errorResponse(error.message));
    }
};
