import {prisma} from '../../../core/database/prisma';
import {Role} from '@prisma/client';
import {toOrderDto} from '../utils/toOrder';

export const updateOrderService = async (
    orderId: number,
    userId: number,
    role: Role,
    dto: Record<string, any>
) => {
    const order = await prisma.order.findUnique({where: {id: orderId}});
    if (!order) throw new Error('Заказ не найден');

    const isOwner = order.customerId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
        throw new Error('Нет доступа к редактированию заказа');
    }

    // Нельзя редактировать заказ после старта, если не админ
    if (order.status !== 'PENDING' && !isAdmin) {
        throw new Error('Нельзя изменить заказ после начала выполнения');
    }

    // Скрываем priority для не‑админов
    if (!isAdmin && dto.priority !== undefined) {
        delete dto.priority;
        delete dto.status;
    }

    const updated = await prisma.order.update({
        where: {id: orderId},
        data: dto,
        include: {
            service: true,
            previewFile: true,
            customer: {
                include: {
                    files: true,
                    customerProfile: {include: {addresses: true}},
                },
            },
            executor: {include: {files: true, executorProfile: true}},
            reports: {include: {files: true}},
            reviews: {include: {author: {include: {files: true}}}},
        },
    });

    return toOrderDto(updated);
};
