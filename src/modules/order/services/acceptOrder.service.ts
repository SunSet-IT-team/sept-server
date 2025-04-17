import {prisma} from '../../../core/database/prisma';
import {OrderStatus} from '@prisma/client';

export const acceptOrderService = async (
    orderId: number,
    executorId: number
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
    });

    if (!order) throw new Error('Заказ не найден');
    if (order.status !== OrderStatus.PENDING) {
        throw new Error('Можно принять только заказ в статусе PENDING');
    }

    const updated = await prisma.order.update({
        where: {id: orderId},
        data: {
            status: OrderStatus.IN_PROGRESS,
            executorId,
        },
    });

    return {message: 'Заказ принят', order: updated};
};
