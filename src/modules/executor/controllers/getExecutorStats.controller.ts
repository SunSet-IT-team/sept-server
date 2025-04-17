import {Request, Response} from 'express';
import {Role} from '@prisma/client';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getExecutorStatsService} from '../services/getExecutorStats.service';

export const getExecutorStats: (
    req: Request,
    res: Response
) => Promise<void> = async (req, res) => {
    try {
        const {role, id} = req.user!;
        if (role !== Role.ADMIN) {
            return sendResponse(res, 403, errorResponse('Доступ запрещён'));
        }
        const executorId = Number(req.params.id);
        if (isNaN(executorId)) {
            return sendResponse(
                res,
                400,
                errorResponse('Неверный ID исполнителя')
            );
        }

        const stats = await getExecutorStatsService(executorId);
        sendResponse(res, 200, successResponse(stats));
    } catch (err: any) {
        sendResponse(res, 500, errorResponse(err.message));
    }
};
