import {OrderStatus} from '@prisma/client';
import {prisma} from '../../../db/prisma';

export async function getAvailable(executorId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    return prisma.order.findMany({
        where: {
            status: OrderStatus.PENDING,
            executorId: null,
            declinedBy: {
                none: {
                    executorId,
                },
            },
        },
        skip,
        take: limit,
        orderBy: {priority: 'asc'},
        include: {
            customer: true,
            service: true,
        },
    });
}
