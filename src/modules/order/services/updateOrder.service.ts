import {Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';

export const updateOrderService = async (
    orderId: number,
    userId: number,
    role: Role,
    data: Record<string, any>
) => {
    if (role !== Role.CUSTOMER && role !== Role.ADMIN) {
        throw new Error('Доступ запрещён');
    }

    const order = await prisma.order.findUnique({
        where: {id: orderId},
        include: {
            customer: true,
        },
    });

    if (!order) throw new Error('Заказ не найден');

    if (order.customer.userId !== userId) {
        throw new Error('Нет доступа к редактированию заказа');
    }

    if (order.status !== 'PENDING' && role !== Role.ADMIN) {
        throw new Error('Заказ нельзя изменить после начала выполнения');
    }

    const updated = await prisma.order.update({
        where: {id: orderId},
        data,
    });

    return updated;
};
