// src/modules/favorite/controllers/getFavorites.controller.ts
import {Request, Response} from 'express';
import {
    getFavoritesService,
    GetFavoritesParams,
} from '../services/getFavorites.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getFavorites = async (req: Request, res: Response) => {
    try {
        // Пользователь точно залогинен и имеет роль CUSTOMER (проверяется middleware)
        const userId = Number(req.user!.id);

        // Собираем параметры из query, приводя их к нужным типам
        const params: GetFavoritesParams = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy:
                typeof req.query.sortBy === 'string'
                    ? req.query.sortBy
                    : undefined,
            order: req.query.order === 'asc' ? 'asc' : 'desc',
            city:
                typeof req.query.city === 'string' ? req.query.city : undefined,
            minRating:
                req.query.minRating != null
                    ? Number(req.query.minRating)
                    : undefined,
            name:
                typeof req.query.name === 'string' ? req.query.name : undefined,
        };

        // Получаем список избранных исполнителей
        // Сервис самостоятельно найдёт customerProfile.id по userId
        const result = await getFavoritesService(params, userId);

        return sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        console.error('[getFavorites]', err);
        // Если в ошибке есть статус — отдаём его, иначе 500
        const status = err.statusCode || err.status || 500;
        return sendResponse(res, status, errorResponse(err.message));
    }
};
