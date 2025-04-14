import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getOrCreateOrderChatForUser} from '../services/getOrderChat.service';

export const getOrderChat = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const orderId = Number(req.params.id);

        if (!userId || !orderId) {
            return sendResponse(res, 400, errorResponse('Некорректные данные'));
        }

        const chat = await getOrCreateOrderChatForUser(orderId, userId);

        return sendResponse(res, 200, successResponse(chat));
    } catch (err) {
        console.error('[getOrderChat]', err);
        return sendResponse(res, 500, errorResponse('Ошибка получения чата'));
    }
};
