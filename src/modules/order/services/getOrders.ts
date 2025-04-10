import {prisma} from '../../../db/prisma';

export async function getOrders(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return prisma.order.findMany({
        skip,
        take: limit,
        orderBy: {priority: 'asc'},
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
            review: true,
        },
    });
}
