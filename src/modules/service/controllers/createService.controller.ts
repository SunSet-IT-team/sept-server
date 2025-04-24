import {Request, Response} from 'express';
import {
    sendResponse,
    errorResponse,
    successResponse,
} from '../../../core/utils/sendResponse';
import {createServiceService} from '../services/createService.service';
import {CreateServiceDTO} from '../dtos/createService.dto';

export const createService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const adminId = Number(req.user?.id);
        const dto: CreateServiceDTO = req.body;
        const files = req.files as {[fieldname: string]: Express.Multer.File[]};

        if (!adminId) {
            return sendResponse(
                res,
                401,
                errorResponse('Пользователь не авторизован')
            );
        }

        const created = await createServiceService(dto, files, adminId);

        return sendResponse(res, 201, successResponse(created));
    } catch (err: any) {
        return sendResponse(
            res,
            400,
            errorResponse(err.message || 'Ошибка при создании сервиса')
        );
    }
};
