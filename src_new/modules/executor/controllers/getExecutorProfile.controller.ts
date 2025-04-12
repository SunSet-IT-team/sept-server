import {Request, Response} from 'express';
import {getExecutorProfileService} from '../services/getExecutorProfile.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getExecutorProfile = async (req: Request, res: Response) => {
    try {
        const executorId = req.user?.id;
        if (!executorId) {
            return sendResponse(
                res,
                401,
                errorResponse('Требуется авторизация')
            );
        }

        const profile = await getExecutorProfileService(executorId);
        sendResponse(res, 200, successResponse(profile));
    } catch (error: any) {
        sendResponse(
            res,
            400,
            errorResponse(error.message || 'Ошибка получения профиля')
        );
    }
};
