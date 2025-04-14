// services/getOrders.service.ts
import {prisma} from '../../../core/database/prisma';
import {paginate, PaginationParams} from '../../../core/utils/pagination';
import {OrderStatus} from '@prisma/client';
import {selectOrder} from '../../../core/prisma/selects';

interface GetOrdersParams extends PaginationParams {
    role: 'CUSTOMER' | 'EXECUTOR' | 'ADMIN';
    userId?: number;
    executorId?: number;
    customerId?: number;
}

export const getMyOrdersService = async ({
    role,
    userId,
    executorId,
    customerId,
    ...pagination
}: GetOrdersParams) => {
    return paginate(
        prisma.order,
        {...pagination},
        {
            defaultSortBy: 'createdAt',
            defaultOrder: 'desc',
            select: selectOrder, // вот здесь переиспользуем
            transformFilters: (filters) => {
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

                if (role === 'CUSTOMER') {
                    where.customer = {userId};
                } else if (role === 'EXECUTOR') {
                    where.executor = {userId};
                } else if (role === 'ADMIN') {
                    if (filters.executorId || executorId)
                        where.executorId = filters.executorId || executorId;
                    if (filters.customerId || customerId)
                        where.customerId = filters.customerId || customerId;
                }

                return where;
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
};
