// getExecutorsListService.ts
import {Prisma} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';

export const getExecutorsListService = async (query: any) => {
    const orderMap: Record<
        string,
        Prisma.ExecutorProfileOrderByWithRelationInput
    > = {
        rating: {rating: query.order || 'desc'},
        experience: {experience: query.order || 'desc'},
        completedOrders: {completedOrders: query.order || 'desc'},
        companyName: {companyName: query.order || 'asc'},
        city: {city: query.order || 'asc'},
        createdAt: {user: {createdAt: query.order || 'desc'}},
    };

    const {page, limit, sortBy, order, ...filters} = query;

    return paginate(
        prisma.executorProfile,
        {
            page,
            limit,
            sortBy,
            order,
            filters,
        },
        {
            defaultSortBy: 'rating',
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        status: true,
                        executorProfile: {
                            select: {
                                city: true,
                            },
                        },
                    },
                },
            },
            orderMap,
            transformFilters: (filters) => {
                const where: Prisma.ExecutorProfileWhereInput = {};

                if (filters.workFormat) {
                    where.workFormat = filters.workFormat;
                }

                if (filters.companyName) {
                    where.companyName = {
                        contains: filters.companyName,
                        mode: 'insensitive',
                    };
                }

                if (filters.minRating) {
                    where.rating = {
                        gte: parseFloat(filters.minRating),
                    };
                }

                if (filters.city) {
                    where.city = {
                        contains: filters.city,
                        mode: 'insensitive',
                    };
                }

                return where;
            },
        }
    );
};
