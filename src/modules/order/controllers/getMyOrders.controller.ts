// controllers/getOrders.controller.ts
import {Request, Response} from 'express';
import {getMyOrdersService} from '../services/getMyOrders.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getMyOrders = async (req: Request, res: Response) => {
    try {
        const {id, role} = req.user!;
        const {
            page,
            limit,
            sortBy,
            order,
            executorId,
            customerId,
            ...rawFilters
        } = req.query;

        const filters = rawFilters as Record<string, any>;

        const result = await getMyOrdersService({
            role,
            userId: Number(id),
            executorId: Number(executorId),
            customerId: Number(customerId),
            filters,
        });

        sendResponse(res, 200, successResponse(result));
    } catch (error: any) {
        sendResponse(res, 400, errorResponse(error.message));
    }
};
