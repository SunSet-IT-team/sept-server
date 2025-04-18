import {Request, Response} from 'express';
import {Role} from '@prisma/client';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getExecutorStatsService} from '../services/getExecutorStats.service';

export const getMyStats: (
    req: Request,
    res: Response
) => Promise<void> = async (req, res) => {
    try {
        const {role, id} = req.user!;
        if (role !== Role.EXECUTOR) {
            return sendResponse(res, 403, errorResponse('Доступ запрещён'));
        }
        const executorId = Number(id);
        const stats = await getExecutorStatsService(executorId);
        sendResponse(res, 200, successResponse(stats));
    } catch (err: any) {
        sendResponse(res, 500, errorResponse(err.message));
    }
};
