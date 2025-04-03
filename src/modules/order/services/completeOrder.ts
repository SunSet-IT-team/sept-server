import {prisma} from '../../../db/prisma';

export async function completeOrder(
    orderId: number,
    executorId: number,
    report: string
) {
    const order = await prisma.order.findUnique({where: {id: orderId}});

    if (!order || order.executorId !== executorId) {
        throw new Error('Вы не можете завершить этот заказ');
    }

    return prisma.order.update({
        where: {id: orderId},
        data: {
            status: 'COMPLETED',
            report,
        },
    });
}
