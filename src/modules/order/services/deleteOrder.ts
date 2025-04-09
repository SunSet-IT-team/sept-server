import {prisma} from '../../../db/prisma';

export async function deleteOrderService(id: number) {
    const order = await prisma.order.findUnique({where: {id}});
    if (!order) throw new Error('Заказ не найден');

    await prisma.order.delete({where: {id}});
}
