import {Request, Response} from 'express';
import {CreateServiceDTO} from '../dtos/createService.dto';
import {createServiceService} from '../services/createService.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const createService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const dto: CreateServiceDTO = req.body;
        const result = await createServiceService(dto);
        sendResponse(res, 200, successResponse(result));
        return;
    } catch (err: any) {
        sendResponse(res, err.code || 400, errorResponse(err.message));
        return;
    }
};
