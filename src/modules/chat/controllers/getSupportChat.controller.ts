import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getSupportChatService} from '../services/getSupportChat.service';

export const getSupportChat = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const chat = await getSupportChatService(userId);

        if (!chat) {
            return sendResponse(
                res,
                404,
                errorResponse('Чат с поддержкой не найден')
            );
        }

        sendResponse(res, 200, successResponse(chat));
    } catch (e: any) {
        sendResponse(res, 400, errorResponse(e.message));
    }
};
