import {Request, Response} from 'express';
import {getServiceByIdService} from '../services/getServiceById.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const getService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {id} = req.params;
        const result = await getServiceByIdService(Number(id));
        if (!result) {
            sendResponse(res, 404, errorResponse('Сервис не найден'));
            return;
        }
        sendResponse(res, 200, successResponse(result));
        return;
    } catch (err: any) {
        sendResponse(res, err.code || 400, errorResponse(err.message));
        return;
    }
};
