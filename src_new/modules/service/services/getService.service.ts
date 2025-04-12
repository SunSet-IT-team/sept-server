import {Prisma} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';
import {paginate, PaginationParams} from '../../../core/utils/pagination';

export const getServicesListService = async (query: PaginationParams) => {
    const allowedSortFields = ['name', 'priority', 'createdAt'];
    const {sortBy = 'priority', order = 'asc'} = query;

    const orderMap: Record<string, Prisma.ServiceOrderByWithRelationInput> = {
        name: {name: order},
        priority: {priority: order},
        createdAt: {createdAt: order},
    };

    const finalSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : 'priority';

    return paginate(
        prisma.service,
        {...query, sortBy: finalSortBy},
        {
            defaultSortBy: 'priority',
            defaultOrder: 'asc',
            orderMap,
        }
    );
};
