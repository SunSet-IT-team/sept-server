import {Request, Response} from 'express';
import {getExecutorProfileService} from '../services/getExecutorProfile.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getExecutorProfile = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id) || Number(req.user!.id);
        if (!userId) {
            return sendResponse(
                res,
                401,
                errorResponse('Требуется авторизация')
            );
        }

        const profile = await getExecutorProfileService(userId);
        sendResponse(res, 200, successResponse(profile));
    } catch (error: any) {
        sendResponse(
            res,
            400,
            errorResponse(error.message || 'Ошибка получения профиля')
        );
    }
};
