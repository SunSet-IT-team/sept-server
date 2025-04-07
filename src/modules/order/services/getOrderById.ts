import {prisma} from '../../../db/prisma';

export async function getOrderById(orderId: number) {
    return prisma.order.findUnique({
        where: {id: orderId},
        include: {
            customer: true,
            executor: true,
            service: true,
            review: true,
        },
    });
}
