import {Request, Response} from 'express';
import {Role} from '@prisma/client';
import {getMyOrdersService} from '../services/getMyOrders.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const getAdminOrders = async (req: Request, res: Response) => {
    try {
        const {role} = req.user!;
        if (role !== Role.ADMIN) {
            return sendResponse(res, 403, errorResponse('Доступ запрещён'));
        }

        const {
            page,
            limit,
            sortBy,
            order,
            executorId,
            customerId,
            ...rawFilters
        } = req.query;

        const result = await getMyOrdersService({
            role: 'ADMIN',
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
            sortBy: sortBy?.toString(),
            order: order === 'asc' || order === 'desc' ? order : 'desc',

            executorId: executorId ? Number(executorId) : undefined,
            customerId: customerId ? Number(customerId) : undefined,

            filters: rawFilters as Record<string, any>,
        });

        return sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
