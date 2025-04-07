import {OrderStatus} from '@prisma/client';
import {prisma} from '../../../db/prisma';

export async function acceptOrder(orderId: number, executorId: number) {
    const order = await prisma.order.findUnique({where: {id: orderId}});

    if (!order) throw new Error('Заказ не найден');
    if (order.status !== 'PENDING')
        throw new Error('Заказ уже в работе или завершён');
    if (order.executorId && order.executorId !== executorId) {
        throw new Error('Этот заказ уже принят другим исполнителем');
    }

    return prisma.order.update({
        where: {id: orderId},
        data: {
            executorId,
            status: 'IN_PROGRESS',
        },
    });
}
