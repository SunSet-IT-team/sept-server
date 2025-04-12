import {Request, Response} from 'express';
import {deleteCustomerProfileService} from '../services/deleteCustomerProfile.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const deleteCustomerProfile = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        await deleteCustomerProfileService(userId);
        sendResponse(res, 200, successResponse({message: 'Профиль удалён'}));
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
    }
};
