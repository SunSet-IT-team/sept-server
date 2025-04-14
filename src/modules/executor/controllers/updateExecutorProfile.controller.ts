import {Request, Response} from 'express';
import {updateExecutorProfileService} from '../services/updateExecutorProfile.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const updateExecutorProfile = async (req: Request, res: Response) => {
    try {
        const isAdminUpdating = Number(!!req.params.id);
        const targetUserId = isAdminUpdating
            ? Number(req.params.id)
            : Number(req.user?.id);

        if (!targetUserId) {
            return sendResponse(
                res,
                400,
                errorResponse('ID пользователя не определён')
            );
        }

        const files = req.files as Record<string, Express.Multer.File[]>;
        const updated = await updateExecutorProfileService(
            targetUserId,
            req.body,
            files
        );

        sendResponse(res, 200, successResponse(updated));
    } catch (error: any) {
        sendResponse(
            res,
            400,
            errorResponse(error.message || 'Ошибка обновления профиля')
        );
    }
};
