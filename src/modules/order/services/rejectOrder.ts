import {prisma} from '../../../db/prisma';

export async function rejectOrder(orderId: number, executorId: number) {
    const order = await prisma.order.findUnique({where: {id: orderId}});

    if (!order) {
        throw new Error('Заказ не найден');
    }

    if (order.executorId) {
        throw new Error('Заказ уже назначен исполнителю');
    }

    const alreadyRejected = await prisma.orderDeclined.findUnique({
        where: {
            orderId_executorId: {
                orderId,
                executorId,
            },
        },
    });

    if (alreadyRejected) {
        throw new Error('Вы уже отклонили этот заказ');
    }

    return prisma.orderDeclined.create({
        data: {
            orderId,
            executorId,
        },
    });
}
