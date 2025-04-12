// modules/chat/controllers/getAllChats.controller.ts
import {Request, Response} from 'express';
import {getChatsService} from '../services/getChats.service';
import {
    successResponse,
    errorResponse,
    sendResponse,
} from '../../../core/utils/sendResponse';

export const getAllChats = async (req: Request, res: Response) => {
    try {
        const result = await getChatsService(req.query);
        return sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        console.error('[getAllChats]', err);
        return sendResponse(res, 500, errorResponse('Ошибка получения чатов'));
    }
};
