import {Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';

export const getOrderByIdService = async (
    orderId: number,
    userId: number,
    role: Role
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
        include: {
            customer: {
                include: {
                    user: true,
                },
            },
            executor: {
                include: {
                    user: true,
                },
            },
            service: true,
            address: true,
            reports: true,
            reviews: true,
        },
    });

    if (!order) {
        throw new Error('Заказ не найден');
    }

    const customerUserId = order.customer.userId;
    const executorUserId = order.executor?.userId;

    const isAdmin = role === Role.ADMIN;
    const isCustomer = role === Role.CUSTOMER && userId === customerUserId;
    const isExecutor = role === Role.EXECUTOR && userId === executorUserId;

    if (!isAdmin && !isCustomer && !isExecutor) {
        throw new Error('Нет доступа к заказу');
    }

    return order;
};
