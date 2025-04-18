// src/modules/order/controllers/updateOrder.controller.ts
import {Request, Response} from 'express';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {UpdateOrderDTO} from '../dtos/updateOrder.dto';
import {updateOrderService} from '../services/updateOrder.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const {id: userId, role} = req.user!;
        const orderId = Number(req.params.id);

        const dto = plainToInstance(UpdateOrderDTO, req.body);
        const errors = await validate(dto);
        if (errors.length) {
            const msg = errors
                .map((e) => Object.values(e.constraints || {}).join(', '))
                .join('; ');
            return sendResponse(res, 400, errorResponse(msg));
        }

        const updatedDto = await updateOrderService(
            orderId,
            userId,
            role,
            dto as any
        );
        return sendResponse(res, 200, successResponse(updatedDto));
    } catch (err: any) {
        const code = err.message.includes('доступ') ? 403 : 400;
        return sendResponse(res, code, errorResponse(err.message));
    }
};
