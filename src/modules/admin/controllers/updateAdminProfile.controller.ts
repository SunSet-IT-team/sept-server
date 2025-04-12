import {Request, Response} from 'express';
import {updateAdminProfileService} from '../services/updateAdminProfile.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const updateAdminProfile = async (req: Request, res: Response) => {
    const userId = req.params.id || req.user!.id;
    try {
        const admin = await updateAdminProfileService(userId, req.body);
        sendResponse(res, 200, successResponse(admin));
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
    }
};
