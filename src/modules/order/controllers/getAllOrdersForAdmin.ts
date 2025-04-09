import {Request, Response} from 'express';
import {getAllOrdersForAdminService} from '../services';

export async function getAllOrdersForAdmin(req: Request, res: Response) {
    const {
        page = 1,
        limit = 10,
        sortBy,
        order,
        customerId,
        executorId,
        status,
        serviceId,
    } = req.query;
    const result = await getAllOrdersForAdminService({
        page: Number(page),
        limit: Number(limit),
        sortBy: sortBy as string,
        order: order as 'asc' | 'desc',
        customerId: customerId ? Number(customerId) : undefined,
        executorId: executorId ? Number(executorId) : undefined,
        status: status as string,
        serviceId: serviceId ? Number(serviceId) : undefined,
    });
    res.json(result);
}
