import {prisma} from '../../../core/database/prisma';
import {OrderStatus} from '@prisma/client';

export const acceptOrderService = async (
    orderId: number,
    executorUserId: number
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
    });

    if (!order) throw new Error('Заказ не найден');
    if (order.status !== OrderStatus.PENDING) {
        throw new Error('Можно принять только заказ в статусе PENDING');
    }

    const executor = await prisma.executorProfile.findUnique({
        where: {userId: executorUserId},
    });

    if (!executor) {
        throw new Error('Профиль исполнителя не найден');
    }

    const updated = await prisma.order.update({
        where: {id: orderId},
        data: {
            status: OrderStatus.IN_PROGRESS,
            executorId: executor.id,
        },
    });

    return {message: 'Заказ принят', order: updated};
};
