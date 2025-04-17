// src/modules/order/services/getMyOrders.service.ts
import {prisma} from '../../../core/database/prisma';
import {
    paginate,
    PaginationParams,
    PaginatedResult,
} from '../../../core/utils/pagination';
import {OrderStatus, Order} from '@prisma/client';
import {toOrderDto} from '../utils/toOrder';
import {OrderDto} from '../dtos/order.dto';

interface GetOrdersParams extends PaginationParams {
    role: 'CUSTOMER' | 'EXECUTOR' | 'ADMIN';
    userId?: number;
    executorId?: number;
    customerId?: number;
    filters?: Record<string, any>;
}

export const getMyOrdersService = async ({
    role,
    userId,
    executorId,
    customerId,
    filters = {},
    sortBy,
    order = 'desc',
    ...pagination
}: GetOrdersParams): Promise<PaginatedResult<OrderDto>> => {
    const where: Record<string, any> = {};

    /*  Статус, услуга, город */
    if (filters.status) where.status = filters.status as OrderStatus;
    if (filters.serviceId) where.serviceId = filters.serviceId;
    if (filters.city)
        where.city = {contains: filters.city, mode: 'insensitive'};

    /*  Дата создания “от‐до” */
    if (filters.fromDate || filters.toDate) {
        where.createdAt = {
            ...(filters.fromDate && {gte: new Date(filters.fromDate)}),
            ...(filters.toDate && {lte: new Date(filters.toDate)}),
        };
    }

    /*  Цена “от‐до”  */
    if (filters.priceFrom || filters.priceTo) {
        where.price = {
            ...(filters.priceFrom && {gte: Number(filters.priceFrom)}),
            ...(filters.priceTo && {lte: Number(filters.priceTo)}),
        };
    }

    if (role === 'CUSTOMER' && userId) where.customerId = userId;
    else if (role === 'EXECUTOR' && userId) where.executorId = userId;
    else if (role === 'ADMIN') {
        if (filters.executorId || executorId)
            where.executorId = filters.executorId ?? executorId;
        if (filters.customerId || customerId)
            where.customerId = filters.customerId ?? customerId;
    }

    const raw = await paginate<Order>(
        prisma.order,
        {
            page: pagination.page,
            limit: pagination.limit,
            sortBy: sortBy ?? 'createdAt',
            order: order === 'asc' ? 'asc' : 'desc',
            filters,
        },
        {
            defaultSortBy: 'createdAt',
            defaultOrder: 'desc',
            include: {
                service: true,
                reports: {include: {files: true}},
                reviews: {
                    include: {
                        author: {
                            include: {
                                customerProfile: true,
                                executorProfile: true,
                                files: true,
                                customerOrders: true,
                                executorOrders: true,
                                reviewsReceived: {select: {id: true}},
                            },
                        },
                    },
                },
            },
            transformFilters: () => where,
        }
    );

    const items: OrderDto[] = await Promise.all(
        raw.items.map(async (order) => {
            const dto = await toOrderDto(order);
            const safeReview = dto.customerReview?.author
                ? dto.customerReview
                : null;

            return {
                title: order.title ?? '',
                ...dto,
                customerReview: safeReview,
            } as OrderDto;
        })
    );

    const {items: _discard, ...meta} = raw;
    return {...meta, items};
};
