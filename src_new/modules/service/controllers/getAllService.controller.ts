import {Request, Response} from 'express';
import {getAllServicesService} from '../services/getAllService.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const getAllServices = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await getAllServicesService();
        sendResponse(res, 200, successResponse(result));
        return;
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
        return;
    }
};
