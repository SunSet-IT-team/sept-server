import {Request, Response} from 'express';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';
import {getCustomerProfileService} from '../services/getCustomerProfile.service';

export const getCustomerProfile = async (req: Request, res: Response) => {
    const userId = Number(req.params.id) || Number(req.user!.id);
    try {
        const customer = await getCustomerProfileService(userId);
        sendResponse(res, 200, successResponse(customer));
    } catch (err: any) {
        sendResponse(res, 404, errorResponse(err.message));
    }
};
