import {prisma} from '../../../core/database/prisma';
import {OrderStatus} from '@prisma/client';

export const rejectOrderService = async (
    orderId: string,
    executorId: string
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
    });

    if (!order) throw new Error('Заказ не найден');
    if (order.status !== OrderStatus.PENDING) {
        throw new Error('Можно отклонить только заказ в статусе PENDING');
    }

    const updated = await prisma.order.update({
        where: {id: orderId},
        data: {
            status: OrderStatus.REJECTED,
            executorId,
        },
    });

    return {message: 'Заказ отклонён', order: updated};
};
