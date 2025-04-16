import {Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';
import {toOrderDto} from '../utils/toOrder';

export const updateOrderService = async (
    orderId: number,
    userId: number,
    role: Role,
    data: Record<string, any>
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
    });

    if (!order) throw new Error('Заказ не найден');

    const isOwner = order.customerId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
        throw new Error('Нет доступа к редактированию заказа');
    }

    if (order.status !== 'PENDING' && !isAdmin) {
        throw new Error('Нельзя изменить заказ после начала выполнения');
    }

    const updated = await prisma.order.update({
        where: {id: orderId},
        data,
        include: {
            service: true,
            customer: {
                include: {
                    files: true,
                    customerProfile: {include: {addresses: true}},
                },
            },
            executor: {include: {files: true, executorProfile: true}},
        },
    });

    return toOrderDto(updated);
};
