import {prisma} from '../../db/prisma';
import {OrderStatus} from '@prisma/client';
import {normalizeCity} from '../../helpers/normalizeCity';

export async function createOrder(data: {
    customerId: number;
    serviceId: number;
    city: string;
    description: string;
}) {
    return prisma.order.create({
        data: {
            customerId: data.customerId,
            serviceId: data.serviceId,
            city: normalizeCity(data.city),
            description: data.description,
        },
    });
}

export async function getOrders(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return prisma.order.findMany({
        skip,
        take: limit,
        orderBy: {priority: 'asc'},
        include: {
            customer: true,
            executor: true,
            service: true,
        },
    });
}

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
