import {Request, Response} from 'express';
import {getStatisticsService} from '../services/getStatistics.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getStatistics = async (req: Request, res: Response) => {
    try {
        const data = await getStatisticsService();
        sendResponse(res, 200, successResponse(data));
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
    }
};
