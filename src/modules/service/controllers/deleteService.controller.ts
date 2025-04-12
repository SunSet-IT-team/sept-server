import {Request, Response} from 'express';
import {deleteServiceService} from '../services/deleteService.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const deleteService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {id} = req.params;
        const result = await deleteServiceService(id);
        if (!result) {
            sendResponse(res, 404, errorResponse('Сервис не найден'));
            return;
        }

        sendResponse(res, 200, successResponse({...result, id: null}));
        return;
    } catch (err: any) {
        sendResponse(res, err.code || 400, errorResponse(err.message));
        return;
    }
};
