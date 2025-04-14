import {Request, Response} from 'express';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';
import {updateCustomerProfileService} from '../services/updateCustomerProfile.service';

export const updateCustomerProfile = async (req: Request, res: Response) => {
    const userId = Number(req.params.id) || Number(req.user!.id);
    try {
        const customer = await updateCustomerProfileService(userId, req.body);
        sendResponse(res, 200, successResponse(customer));
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
    }
};
