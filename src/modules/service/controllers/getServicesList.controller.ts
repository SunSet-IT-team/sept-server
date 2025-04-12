import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {getServicesListService} from '../services/getService.service';

export const getServicesList = async (req: Request, res: Response) => {
    try {
        const services = await getServicesListService(req.query);
        sendResponse(res, 200, successResponse(services));
    } catch (error: any) {
        sendResponse(res, 400, errorResponse(error.message));
    }
};
