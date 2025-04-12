import {Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';

export const deleteOrderService = async (
    orderId: string,
    userId: string,
    role: Role
) => {
    if (role !== Role.CUSTOMER && role !== Role.ADMIN) {
        throw new Error('Доступ запрещён');
    }

    const order = await prisma.order.findUnique({
        where: {id: orderId},
        include: {customer: true},
    });

    if (!order) throw new Error('Заказ не найден');

    if (order.customer.userId !== userId && role === Role.CUSTOMER) {
        throw new Error('Вы не являетесь владельцем заказа');
    }

    if (order.status !== 'PENDING') {
        throw new Error('Удалить можно только заказ в статусе PENDING');
    }

    await prisma.order.delete({
        where: {id: orderId},
    });

    return {message: 'Заказ успешно удалён'};
};
