import {prisma} from '../../../db/prisma';

export async function getOrders(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return prisma.order.findMany({
        skip,
        take: limit,
        orderBy: {priority: 'asc'},
        include: {
            customer: true,
            executor: true,
            service: true,
        },
    });
}
