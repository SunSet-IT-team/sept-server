// services/getOrderById.service.ts
import {Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';
import {toOrderDto} from '../utils/toOrder';

export const getOrderByIdService = async (
    orderId: number,
    userId: number,
    role: Role
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
        include: {
            service: true,
            executor: {
                include: {
                    files: true,
                    executorProfile: true,
                    customerOrders: true,
                    executorOrders: true,
                    reviewsReceived: {select: {id: true}},
                },
            },
            customer: {
                include: {
                    files: true,
                    customerProfile: {include: {addresses: true}},
                    customerOrders: true,
                    executorOrders: true,
                    reviewsReceived: {select: {id: true}},
                },
            },

            reports: {include: {files: true}},

            reviews: {
                include: {
                    author: {
                        include: {
                            files: true,
                            customerProfile: true,
                            executorProfile: true,
                            customerOrders: true,
                            executorOrders: true,
                            reviewsReceived: {select: {id: true}},
                        },
                    },
                },
            },
        },
    });

    if (!order) throw new Error('Заказ не найден');

    const isAdmin = role === Role.ADMIN;
    const isCustomer = role === Role.CUSTOMER && userId === order.customerId;
    const isExecutor = role === Role.EXECUTOR && userId === order.executorId;

    if (!isAdmin && !isCustomer && !isExecutor) {
        throw new Error('Нет доступа к заказу');
    }
    return toOrderDto(order);
};
