// modules/order/controllers/createOrder.controller.ts
import {Request, Response} from 'express';
import {
    sendResponse,
    errorResponse,
    successResponse,
} from '../../../core/utils/sendResponse';
import {createOrderService} from '../services/createOrder.service';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const customerId = Number(req.user?.id);
        const dto = req.body;

        if (!customerId) {
            return sendResponse(
                res,
                401,
                errorResponse('Пользователь не авторизован')
            );
        }

        const created = await createOrderService(dto, customerId);

        return sendResponse(res, 201, successResponse(created));
    } catch (error: any) {
        return sendResponse(
            res,
            400,
            errorResponse(error.message || 'Ошибка при создании заказа')
        );
    }
};
