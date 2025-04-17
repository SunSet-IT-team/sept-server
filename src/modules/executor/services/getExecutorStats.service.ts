import {prisma} from '../../../core/database/prisma';
import {OrderStatus} from '@prisma/client';

export interface ExecutorStats {
    rating: number;
    income: {
        month: number;
        total: number;
    };
    statsMonth: {
        calls: number;
        closed: number;
        rejected: number;
    };
    statsTotal: {
        calls: number;
        closed: number;
        rejected: number;
    };
}

export const getExecutorStatsService = async (
    executorId: number
): Promise<ExecutorStats> => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const user = await prisma.user.findUnique({
        where: {id: executorId},
        include: {
            executorProfile: {
                select: {
                    rating: true,
                },
            },
        },
    });

    const [{_sum: totalAgg}, {_sum: monthAgg}] = await Promise.all([
        prisma.report.aggregate({
            where: {order: {executorId}},
            _sum: {total: true},
        }),
        prisma.report.aggregate({
            where: {
                order: {executorId},
                createdAt: {gte: startOfMonth},
            },
            _sum: {total: true},
        }),
    ]);

    const countOrders = async (
        statusFilter?: OrderStatus | OrderStatus[],
        since?: Date
    ) =>
        prisma.order.count({
            where: {
                executorId,
                ...(statusFilter
                    ? Array.isArray(statusFilter)
                        ? {status: {in: statusFilter}}
                        : {status: statusFilter}
                    : {}),
                ...(since ? {createdAt: {gte: since}} : {}),
            },
        });

    const [callsTotal, closedTotal, rejectedTotal] = await Promise.all([
        prisma.order.count({where: {executorId}}),
        countOrders(OrderStatus.COMPLETED),
        countOrders([OrderStatus.REJECTED, OrderStatus.CANCELLED]),
    ]);

    const [callsMonth, closedMonth, rejectedMonth] = await Promise.all([
        countOrders(undefined, startOfMonth),
        countOrders(OrderStatus.COMPLETED, startOfMonth),
        countOrders(
            [OrderStatus.REJECTED, OrderStatus.CANCELLED],
            startOfMonth
        ),
    ]);

    return {
        rating: user?.executorProfile?.rating ?? 0,
        income: {
            month: monthAgg.total ?? 0,
            total: totalAgg.total ?? 0,
        },
        statsMonth: {
            calls: callsMonth,
            closed: closedMonth,
            rejected: rejectedMonth,
        },
        statsTotal: {
            calls: callsTotal,
            closed: closedTotal,
            rejected: rejectedTotal,
        },
    };
};
