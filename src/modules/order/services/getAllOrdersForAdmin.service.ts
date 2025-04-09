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
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        order = 'desc',
        customerId,
        executorId,
        status,
        serviceId,
    } = params;

    // Строим фильтры
    const where: any = {};

    if (status) where.status = status;
    if (customerId) where.customerId = Number(customerId);
    if (executorId) where.executorId = Number(executorId);
    if (serviceId) where.serviceId = Number(serviceId);

    // Основной запрос с правильной структурой include
    const orders = await prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {[sortBy]: order},
        include: {
            customer: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                    status: true,
                    customerProfile: true,
                },
            },
            executor: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                    status: true,
                    executorProfile: true,
                },
            },
            service: {
                select: {
                    id: true,
                    name: true,
                    priority: true,
                },
            },
        },
    });

    const total = await prisma.order.count({where});

    // Форматируем ответ
    const formattedOrders = orders.map((order) => ({
        ...order,
        customer: {
            ...order.customer,
            profile: order.customer.customerProfile,
        },
        executor: order.executor
            ? {
                  ...order.executor,
                  profile: order.executor.executorProfile,
              }
            : null,
    }));

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        orders: formattedOrders,
    };
}
