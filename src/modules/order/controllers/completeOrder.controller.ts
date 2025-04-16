import {Request, Response} from 'express';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {completeOrderService} from '../services/completeOrder.service';
import {CompleteOrderDTO} from '../dtos/completeOrder.dto';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';

export const completeOrder = async (req: Request, res: Response) => {
    try {
        const executorId = Number(req.user?.id);
        const orderId = Number(req.params.id);
        const files = req.files as Record<string, Express.Multer.File[]>;

        const dto = plainToInstance(CompleteOrderDTO, req.body);
        const errors = await validate(dto);

        if (errors.length) {
            const msg = errors
                .map((e) => Object.values(e.constraints || {}).join(', '))
                .join('; ');
            return sendResponse(res, 400, errorResponse(msg));
        }

        if (!orderId || !executorId) {
            return sendResponse(res, 401, errorResponse('Не авторизован'));
        }

        const result = await completeOrderService(orderId, executorId, files);
        sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
    }
};
