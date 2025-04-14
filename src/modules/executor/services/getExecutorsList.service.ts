import {Prisma, FileType} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';
import {toExecutorProfile} from '../../user/utils/toExecutorProfile';

import {getUserById} from '../../user/services/getUser';

export const getExecutorsListService = async (query: any) => {
    const orderMap: Record<
        string,
        Prisma.ExecutorProfileOrderByWithRelationInput
    > = {
        priority: {priority: query.order || 'desc'},
        rating: {rating: query.order || 'desc'},
        experience: {experience: query.order || 'desc'},
        completedOrders: {completedOrders: query.order || 'desc'},
        companyName: {companyName: query.order || 'asc'},
        city: {city: query.order || 'asc'},
        createdAt: {user: {createdAt: query.order || 'desc'}},
    };

    const {page, limit, sortBy, order, ...filters} = query;

    const rawResults = await paginate(
        prisma.executorProfile,
        {
            page,
            limit,
            sortBy,
            order,
            filters,
        },
        {
            defaultSortBy: 'priority',
            include: {
                user: true, // только ID-шники, остальное подтянем через getUserDtoById
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

    const items = await Promise.all(
        rawResults.items.map(async (executor) => {
            return getUserById(executor.userId);
        })
    );

    return {
        ...rawResults,
        items,
    };
};
