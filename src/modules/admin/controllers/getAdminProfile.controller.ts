import {Request, Response} from 'express';
import {getAdminProfileService} from '../services/getAdminProfile.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const getAdminProfile = async (req: Request, res: Response) => {
    const userId = Number(req.params.id) || Number(req.user!.id);
    try {
        const admin = await getAdminProfileService(userId);
        sendResponse(res, 200, successResponse(admin));
    } catch (err: any) {
        sendResponse(res, 404, errorResponse(err.message));
    }
};
