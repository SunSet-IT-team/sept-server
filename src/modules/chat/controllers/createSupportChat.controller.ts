import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {createSupportChatService} from '../services/createSupportChat.service';

export const createSupportChat = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const {theme} = req.body;

        if (!theme || typeof theme !== 'string') {
            return sendResponse(res, 400, errorResponse('Тема обязательна'));
        }

        const chat = await createSupportChatService(userId, theme);
        sendResponse(res, 201, successResponse(chat));
    } catch (e: any) {
        sendResponse(res, 400, errorResponse(e.message));
    }
};
