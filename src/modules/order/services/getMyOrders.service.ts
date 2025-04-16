import {prisma} from '../../../core/database/prisma';
import {paginate, PaginationParams} from '../../../core/utils/pagination';
import {OrderStatus} from '@prisma/client';
import {toOrderDto} from '../utils/toOrder';

interface GetOrdersParams extends PaginationParams {
    role: 'CUSTOMER' | 'EXECUTOR' | 'ADMIN';
    userId?: number;
    executorId?: number;
    customerId?: number;
    filters?: any;
}

export const getMyOrdersService = async ({
    role,
    userId,
    executorId,
    customerId,
    filters = {},
    ...pagination
}: GetOrdersParams) => {
    console.log(role, userId, executorId, customerId, filters, pagination);
    const where: any = {};

    if (filters.status) {
        where.status = filters.status as OrderStatus;
    }

    if (filters.fromDate && filters.toDate) {
        where.createdAt = {
            gte: new Date(filters.fromDate),
            lte: new Date(filters.toDate),
        };
    }

    if (filters.serviceId) {
        where.serviceId = filters.serviceId;
    }

    if (role === 'CUSTOMER' && userId) {
        where.customerId = userId;
    } else if (role === 'EXECUTOR' && userId) {
        where.executorId = userId;
    } else if (role === 'ADMIN') {
        if (filters.executorId || executorId)
            where.executorId = filters.executorId || executorId;
        if (filters.customerId || customerId)
            where.customerId = filters.customerId || customerId;
    }

    const result = await paginate(
        prisma.order,
        {...pagination},
        {
            defaultSortBy: 'createdAt',
            defaultOrder: 'desc',
            transformFilters: () => where,
            include: {
                service: true,
            },
            orderMap: {
                createdAt: {
                    createdAt:
                        pagination.order === 'asc' ||
                        pagination.order === 'desc'
                            ? pagination.order
                            : 'desc',
                },
            },
        }
    );

    const transformedItems = await Promise.all(
        result.items.map((item) => toOrderDto(item))
    );

    return {
        ...result,
        items: transformedItems,
    };
};
