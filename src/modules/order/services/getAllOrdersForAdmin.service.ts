import {OrderStatus} from '@prisma/client';
import {prisma} from '../../../db/prisma';

export async function getAllOrdersForAdminService(params: {
    page: number;
    limit: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    customerId?: number;
    executorId?: number;
    status?: string;
    serviceId?: number;
}) {
    const {
        page,
        limit,
        sortBy = 'createdAt',
        order = 'desc',
        customerId,
        executorId,
        status,
        serviceId,
    } = params;

    const filters: any = {
        status: status && OrderStatus[status as keyof typeof OrderStatus], // приведение
        executorId: executorId ? Number(executorId) : undefined,
        customerId: customerId ? Number(customerId) : undefined,
        serviceId: serviceId ? Number(serviceId) : undefined,
    };

    // Убираем undefined значения (опционально)
    Object.keys(filters).forEach(
        (key) => filters[key] === undefined && delete filters[key]
    );

    const orders = await prisma.order.findMany({
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {[sortBy]: order},
        include: {
            customer: true,
            executor: true,
            service: true,
        },
    });

    const total = await prisma.order.count({where: filters});

    return {
        total,
        page,
        limit,
        orders,
    };
}
