import {prisma} from '../../../db/prisma';

export async function getOrderById(orderId: number) {
    return prisma.order.findUnique({
        where: {id: orderId},
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
