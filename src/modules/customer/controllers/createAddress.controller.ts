import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {createAddressService} from '../services/createAddress.service';

export const createAddress = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        if (!userId) {
            return sendResponse(
                res,
                400,
                errorResponse('Пользователь не найден')
            );
        }

        const result = await createAddressService(userId, req.body);
        return sendResponse(res, 201, successResponse(result));
    } catch (error: any) {
        console.error('[createAddress]', error);
        return sendResponse(res, 500, errorResponse(error.message));
    }
};
