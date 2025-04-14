import {Request, Response} from 'express';
import {UpdateServiceDTO} from '../dtos/updateService.dto';
import {updateServiceService} from '../services/updateService.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const updateService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {id} = req.params;
        const serviceData: UpdateServiceDTO = req.body;
        const result = await updateServiceService(Number(id), serviceData);

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
