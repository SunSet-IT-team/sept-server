// src/modules/order/controllers/getOrders.controller.ts
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
            executorId: qExecutorId,
            customerId: qCustomerId,
            ...rawFilters
        } = req.query;

        const pExecutorId = req.params.executorId;
        const pCustomerId = req.params.customerId;

        const executorId = pExecutorId
            ? Number(pExecutorId)
            : qExecutorId
            ? Number(qExecutorId)
            : undefined;

        const customerId = pCustomerId
            ? Number(pCustomerId)
            : qCustomerId
            ? Number(qCustomerId)
            : undefined;

        const filters: Record<string, any> = {
            ...rawFilters,
            priceFrom: rawFilters.priceFrom
                ? Number(rawFilters.priceFrom)
                : undefined,
            priceTo: rawFilters.priceTo
                ? Number(rawFilters.priceTo)
                : undefined,
        };

        const result = await getMyOrdersService({
            role,
            userId: Number(id),
            executorId,
            customerId,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
            sortBy: sortBy?.toString(),
            order: order === 'asc' || order === 'desc' ? order : 'desc',
            filters,
        });

        return sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
