import {Role} from '@prisma/client';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';
import {Request, Response} from 'express';
import {getCustomerStatsService} from '../services/getCustomerStats.service';

export const getMyStats = async (req: Request, res: Response) => {
    try {
        const {id, role} = req.user!;
        if (role !== Role.CUSTOMER) {
            return sendResponse(res, 403, errorResponse('Доступ запрещён'));
        }

        const stats = await getCustomerStatsService(Number(id));
        return sendResponse(res, 200, successResponse(stats));
    } catch (err: any) {
        return sendResponse(res, 500, errorResponse(err.message));
    }
};
