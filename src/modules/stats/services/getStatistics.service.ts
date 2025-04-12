import {prisma} from '../../../core/database/prisma';
import {OrderStatus} from '@prisma/client';

export const getStatisticsService = async () => {
    // Общая статистика заявок
    const totalOrders = await prisma.order.count();
    const closedOrders = await prisma.order.count({
        where: {status: OrderStatus.COMPLETED},
    });
    const openOrders = totalOrders - closedOrders;

    // Общая статистика мастеров
    const totalExecutors = await prisma.executorProfile.count();
    const newExecutors = await prisma.executorProfile.count({
        where: {
            user: {
                createdAt: {
                    gte: new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                    ),
                },
            },
        },
    });

    // Распределение заявок по городам (из профиля исполнителя)
    const cityStatsRaw = await prisma.order.groupBy({
        by: ['executorId'],
        where: {
            status: OrderStatus.COMPLETED,
            executorId: {not: null},
        },
    });

    const cityOrders: Record<string, number> = {};

    for (const entry of cityStatsRaw) {
        const executor = await prisma.executorProfile.findUnique({
            where: {id: entry.executorId!},
            select: {city: true},
        });

        if (executor?.city) {
            cityOrders[executor.city] = (cityOrders[executor.city] || 0) + 1;
        }
    }

    // Топ исполнителей по закрытым заказам
    const topExecutorsRaw = await prisma.order.groupBy({
        by: ['executorId'],
        where: {
            status: OrderStatus.COMPLETED,
            executorId: {not: null},
        },
        _count: {
            executorId: true,
        },
        orderBy: {
            _count: {
                executorId: 'desc',
            },
        },
        take: 3,
    });

    const topExecutors = await Promise.all(
        topExecutorsRaw.map(async (entry) => {
            const executor = await prisma.executorProfile.findUnique({
                where: {id: entry.executorId!},
                include: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            });

            const name = executor?.user
                ? `${executor.user.firstName || ''} ${
                      executor.user.lastName || ''
                  }`.trim() || 'Без имени'
                : 'Неизвестно';

            return {
                name,
                closedCount: entry._count?.executorId || 0,
            };
        })
    );

    // Сумма закрытых заявок (берём price)
    const closedOrdersSumAgg = await prisma.order.aggregate({
        where: {status: OrderStatus.COMPLETED},
        _sum: {price: true},
    });

    return {
        orders: {
            total: totalOrders,
            closed: closedOrders,
            open: openOrders,
            closedPercent: ((closedOrders / totalOrders) * 100).toFixed(0),
            openPercent: ((openOrders / totalOrders) * 100).toFixed(0),
        },
        executors: {
            total: totalExecutors,
            newThisMonth: newExecutors,
            byCity: cityOrders,
            top: topExecutors,
        },
        closedOrdersTotalSum: closedOrdersSumAgg._sum.price ?? 0,
    };
};
