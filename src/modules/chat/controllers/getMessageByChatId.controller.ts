import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getMessagesByChatIdService} from '../services/getMessageByChatId.service';

export const getMessagesByChatId = async (req: Request, res: Response) => {
    try {
        const chatId = req.params.id;
        if (!chatId) {
            return sendResponse(res, 400, errorResponse('chatId обязателен'));
        }

        const paginatedMessages = await getMessagesByChatIdService(
            chatId,
            req.query
        );

        return sendResponse(res, 200, successResponse(paginatedMessages));
    } catch (err) {
        return sendResponse(
            res,
            500,
            errorResponse('Ошибка при получении сообщений')
        );
    }
};
