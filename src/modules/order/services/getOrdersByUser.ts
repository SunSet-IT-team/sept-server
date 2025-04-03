import {prisma} from '../../../db/prisma';
import {OrderStatus, Role} from '@prisma/client';

export async function getOrdersByUser(
    userId: number,
    role: Role,
    status?: OrderStatus
) {
    const where =
        role === 'CUSTOMER'
            ? {customerId: userId, ...(status && {status})}
            : {executorId: userId, ...(status && {status})};

    return prisma.order.findMany({
        where,
        include: {
            service: true,
            customer: true,
            executor: true,
        },
        orderBy: {createdAt: 'desc'},
    });
}
