// controllers/getFavorites.controller.ts
import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getFavoritesService} from '../services/getFavorites.service';

export const getFavorites = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        if (!userId) {
            return sendResponse(res, 401, errorResponse('Не авторизован'));
        }

        const data = await getFavoritesService(req.query, userId);

        sendResponse(res, 200, successResponse(data));
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
    }
};
