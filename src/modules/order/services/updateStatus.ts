import {OrderStatus} from '@prisma/client';
import {prisma} from '../../../db/prisma';

export async function updateOrderStatus(
    orderId: number,
    executorId: number,
    status: OrderStatus
) {
    const order = await prisma.order.findUnique({where: {id: orderId}});
    if (!order) throw new Error('Заказ не найден');

    if (order.executorId && order.executorId !== executorId) {
        throw new Error('Вы не являетесь исполнителем этого заказа');
    }

    return prisma.order.update({
        where: {id: orderId},
        data: {
            executorId,
            status,
        },
    });
}
