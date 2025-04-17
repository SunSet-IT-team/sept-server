// src/modules/customer/services/getCustomerStats.service.ts
import {prisma} from '../../../core/database/prisma';
import {OrderStatus} from '@prisma/client';

export interface CustomerStats {
    orders: {
        total: number;
        open: number;
        closed: number;
        cancelled: number;
    };
    ordersMonth: {
        calls: number;
        closed: number;
        cancelled: number;
    };
    ordersTotal: {
        calls: number;
        closed: number;
        cancelled: number;
    };
}

export const getCustomerStatsService = async (
    customerId: number
): Promise<CustomerStats> => {
    const totalCalls = await prisma.order.count({
        where: {customerId},
    });
    const totalClosed = await prisma.order.count({
        where: {customerId, status: OrderStatus.COMPLETED},
    });
    const totalCancelled = await prisma.order.count({
        where: {customerId, status: OrderStatus.CANCELLED},
    });
    const totalOpen = totalCalls - totalClosed - totalCancelled;

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthCalls = await prisma.order.count({
        where: {
            customerId,
            createdAt: {gte: monthStart},
        },
    });
    const monthClosed = await prisma.order.count({
        where: {
            customerId,
            status: OrderStatus.COMPLETED,
            createdAt: {gte: monthStart},
        },
    });
    const monthCancelled = await prisma.order.count({
        where: {
            customerId,
            status: OrderStatus.CANCELLED,
            createdAt: {gte: monthStart},
        },
    });

    return {
        orders: {
            total: totalCalls,
            open: totalOpen,
            closed: totalClosed,
            cancelled: totalCancelled,
        },
        ordersMonth: {
            calls: monthCalls,
            closed: monthClosed,
            cancelled: monthCancelled,
        },
        ordersTotal: {
            calls: totalCalls,
            closed: totalClosed,
            cancelled: totalCancelled,
        },
    };
};
