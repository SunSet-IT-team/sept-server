import {Request, Response} from 'express';
import {deleteExecutorProfileService} from '../services/deleteExecutorProfile.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const deleteExecutorProfile = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if (!id) {
            return sendResponse(
                res,
                400,
                errorResponse('Не указан id исполнителя')
            );
        }

        const result = await deleteExecutorProfileService(id);
        sendResponse(res, 200, successResponse(result));
    } catch (error: any) {
        sendResponse(
            res,
            400,
            errorResponse(error.message || 'Ошибка удаления исполнителя')
        );
    }
};
