import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {updateOrderService} from '../services/updateOrder.service';

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const userId = req.user?.id;
        const role = req.user?.role;

        if (!orderId || !userId || !role) {
            return sendResponse(res, 401, errorResponse('Не авторизован'));
        }

        const updatedOrder = await updateOrderService(
            orderId,
            userId,
            role,
            req.body
        );
        return sendResponse(res, 200, successResponse(updatedOrder));
    } catch (error: any) {
        return sendResponse(res, 400, errorResponse(error.message));
    }
};
