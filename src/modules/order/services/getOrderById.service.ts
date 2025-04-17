import {Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';
import {toOrderDto} from '../utils/toOrder';

export const getOrderByIdService = async (
    orderId: number,
    userId: number,
    role: Role
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
        include: {
            customer: true,
            executor: true,
            service: true,
            reports: {
                include: {
                    files: true,
                },
            },
            reviews: true,
            chats: true,
        },
    });

    if (!order) {
        throw new Error('Заказ не найден');
    }

    const isAdmin = role === Role.ADMIN;
    const isCustomer = role === Role.CUSTOMER && userId === order.customerId;
    const isExecutor = role === Role.EXECUTOR && userId === order.executorId;

    if (!isAdmin && !isCustomer && !isExecutor) {
        throw new Error('Нет доступа к заказу');
    }

    return await toOrderDto(order);
};
