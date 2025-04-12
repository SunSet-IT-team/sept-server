import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getSupportChatService} from '../services/getSupportChat.service';

export const getSupportChat = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const role = req.user?.role;
        const orderId = req.params.orderId;

        if (!userId || !role || !orderId) {
            return sendResponse(res, 400, errorResponse('Некорректные данные'));
        }

        const chat = await getSupportChatService(userId, role, orderId);
        return sendResponse(res, 200, successResponse(chat));
    } catch (err: any) {
        console.error('[getOrCreateOrderSupportChat]', err);
        return sendResponse(res, 500, errorResponse('Ошибка создания чата'));
    }
};
