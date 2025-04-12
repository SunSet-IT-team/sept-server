import {Request, Response} from 'express';
import {getExecutorsListService} from '../services/getExecutorsList.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getExecutorsList = async (req: Request, res: Response) => {
    try {
        const result = await getExecutorsListService(req.query);
        sendResponse(res, 200, successResponse(result));
    } catch (error: any) {
        sendResponse(
            res,
            400,
            errorResponse(error.message || 'Ошибка получения исполнителей')
        );
    }
};
