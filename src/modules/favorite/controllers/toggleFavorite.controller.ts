import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {toggleFavoriteService} from '../services/toggleFavorite.service';

export const toggleFavorite = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id!;
        const {executorId} = req.params;

        const result = await toggleFavoriteService({userId, executorId});
        sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
    }
};
