import {Request, Response} from 'express';
import {getOrderByIdService} from '../services/getOrderById.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const role = req.user?.role;
        const {id} = req.params;

        if (!userId || !role) {
            return sendResponse(res, 401, errorResponse('Не авторизован'));
        }

        const order = await getOrderByIdService(id, userId, role);
        return sendResponse(res, 200, successResponse(order));
    } catch (error: any) {
        return sendResponse(res, 403, errorResponse(error.message));
    }
};
