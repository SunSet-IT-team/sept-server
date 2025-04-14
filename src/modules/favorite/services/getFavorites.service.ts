import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';

export const getFavoritesService = async (query: any, customerId: number) => {
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
                        user: true,
                    },
                },
            },
            orderMap: {
                createdAt: {createdAt: order || 'desc'},
            },
            transformFilters: (filters) => {
                const where: any = {};
                where.customerId = customerId;
                if (filters.city) {
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
