// services/getFavoritesList.service.ts
import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';

export const getFavoritesService = async (query: any, customerId: string) => {
    const {page, limit, sortBy, order, ...filters} = query;

    return paginate(
        prisma.favorite,
        {page, limit, sortBy, order, filters},
        {
            defaultSortBy: 'createdAt',
            defaultOrder: 'desc',
            include: {
                executor: {
                    include: {
                        user: true, // если нужно
                    },
                },
            },
            orderMap: {
                // Например, сортировать по времени добавления в избранное
                createdAt: {createdAt: order || 'desc'},
            },
            transformFilters: (filters) => {
                const where: any = {};

                // customerId обязателен
                where.customerId = customerId;

                // Если хотим фильтровать исполнителей по городу
                if (filters.city) {
                    // city лежит в executorProfile
                    where.executor = {
                        city: {
                            contains: filters.city,
                            mode: 'insensitive',
                        },
                    };
                }

                return where;
            },
        }
    );
};
