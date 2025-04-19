import {prisma} from '../../../core/database/prisma';
import {OrderStatus, Role} from '@prisma/client';

export const getStatisticsService = async () => {
    // Общая статистика заказов
    const totalOrders = await prisma.order.count();
    const closedOrders = await prisma.order.count({
        where: {status: OrderStatus.COMPLETED},
    });
    const openOrders = totalOrders - closedOrders;

    // Общая статистика исполнителей
    const totalExecutors = await prisma.user.count({
        where: {role: Role.EXECUTOR},
    });

    const newExecutors = await prisma.user.count({
        where: {
            role: Role.EXECUTOR,
            createdAt: {
                gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1
                ),
            },
        },
    });

    // Распределение заявок по городам (берём из executorProfile.city)
    const completedOrders = await prisma.order.findMany({
        where: {
            status: OrderStatus.COMPLETED,
        },
        select: {
            executor: {
                select: {
                    executorProfile: {
                        select: {
                            city: true,
                        },
                    },
                },
            },
        },
    });

    const cityOrders: Record<string, number> = {};
    for (const order of completedOrders) {
        const city = order.executor?.executorProfile?.city;
        if (city) {
            cityOrders[city] = (cityOrders[city] || 0) + 1;
        }
    }

    // Топ-3 исполнителей по числу завершённых заказов
    const topExecutorsRaw = await prisma.order.groupBy({
        by: ['executorId'],
        where: {
            status: OrderStatus.COMPLETED,
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
            const executor = await prisma.user.findUnique({
                where: {id: entry.executorId!},
                select: {
                    executorProfile: {
                        select: {
                            companyName: true,
                        },
                    },
                },
            });

            const name =
                executor?.executorProfile?.companyName?.trim() ||
                'Название не указано';

            return {
                name,
                closedCount: entry._count.executorId || 0,
            };
        })
    );

    // Сумма по всем завершённым заказам
    const closedReportsSumAgg = await prisma.report.aggregate({
        where: {
            order: {
                status: OrderStatus.COMPLETED,
            },
        },
        _sum: {
            total: true,
        },
    });

    return {
        orders: {
            total: totalOrders,
            closed: closedOrders,
            open: openOrders,
            closedPercent: totalOrders
                ? ((closedOrders / totalOrders) * 100).toFixed(0)
                : '0',
            openPercent: totalOrders
                ? ((openOrders / totalOrders) * 100).toFixed(0)
                : '0',
        },
        executors: {
            total: totalExecutors,
            newThisMonth: newExecutors,
            byCity: cityOrders,
            top: topExecutors,
        },
        closedOrdersTotalSum: closedReportsSumAgg._sum.total ?? 0,
    };
};
