import {OrderStatus, Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';

export const deleteOrderService = async (
    orderId: number,
    userId: number,
    role: Role
) => {
    if (role !== Role.CUSTOMER && role !== Role.ADMIN) {
        throw new Error('Доступ запрещён');
    }

    const order = await prisma.order.findUnique({
        where: {id: orderId},
    });

    if (!order) throw new Error('Заказ не найден');

    if (order.status === OrderStatus.IN_PROGRESS) {
        throw new Error('Удалить можно только заказ который в работе нельзя');
    }

    await prisma.order.delete({
        where: {id: orderId},
    });

    return {message: 'Заказ успешно удалён'};
};
