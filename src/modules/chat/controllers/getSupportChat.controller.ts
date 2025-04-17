// modules/chat/controllers/getSupportChat.controller.ts
import {Request, Response} from 'express';
import {getSupportChatService} from '../services/getSupportChat.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getSupportChat = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const role = req.user?.role;
        if (!userId || !role) {
            return sendResponse(
                res,
                400,
                errorResponse('Необходима авторизация')
            );
        }

        const orderId = req.query.orderId
            ? Number(req.query.orderId)
            : undefined;
        const theme = req.query.theme as string | undefined;

        const chat = await getSupportChatService(userId, role, orderId, theme);
        return sendResponse(res, 200, successResponse(chat));
    } catch (e: any) {
        return sendResponse(res, 400, errorResponse(e.message));
    }
};
