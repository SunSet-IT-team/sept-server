import {Request, Response} from 'express';
import {Role} from '@prisma/client';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getCustomerStatsService} from '../services/getCustomerStats.service';

export const getCustomerStats = async (req: Request, res: Response) => {
    try {
        const {role} = req.user!;
        const customerId = Number(req.params.id);
        if (!customerId) {
            return sendResponse(
                res,
                400,
                errorResponse('Неверный ID заказчика')
            );
        }

        const stats = await getCustomerStatsService(customerId);
        return sendResponse(res, 200, successResponse(stats));
    } catch (err: any) {
        return sendResponse(res, 500, errorResponse(err.message));
    }
};
