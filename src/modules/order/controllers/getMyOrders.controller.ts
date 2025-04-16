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

        // console.log(rawFilters);

        const filters = rawFilters as Record<string, any>;

        const result = await getMyOrdersService({
            role,
            userId: Number(id),
            executorId: executorId ? Number(executorId) : undefined,
            customerId: customerId ? Number(customerId) : undefined,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
            sortBy: sortBy?.toString(),
            order: order === 'asc' || order === 'desc' ? order : 'desc',
            filters,
        });

        sendResponse(res, 200, successResponse(result));
    } catch (error: any) {
        sendResponse(res, 400, errorResponse(error.message));
    }
};
