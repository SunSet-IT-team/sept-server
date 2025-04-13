import {Prisma, Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';

export const getCustomersListService = async (query: any) => {
    // Определяем сопоставление полей для сортировки (orderMap)
    const orderMap: Record<
        string,
        Prisma.CustomerProfileOrderByWithRelationInput
    > = {
        firstName: {user: {firstName: query.order || 'asc'}},
        lastName: {user: {lastName: query.order || 'asc'}},
        email: {user: {email: query.order || 'asc'}},
        status: {user: {status: query.order || 'asc'}},
    };

    const {page, limit, sortBy, order, ...filters} = query;

    return paginate(
        prisma.customerProfile,
        {page, limit, sortBy, order, filters},
        {
            defaultSortBy: 'firstName',
            defaultOrder: 'asc',
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        status: true,
                    },
                },
                addresses: true,
            },
            orderMap,
            transformFilters: (filters) => {
                const where: Prisma.CustomerProfileWhereInput = {};
                const userFilters: any = {};

                // Фильтры по имени, фамилии, email
                if (filters.firstName) {
                    userFilters.firstName = {
                        contains: filters.firstName,
                        mode: 'insensitive',
                    };
                }
                if (filters.lastName) {
                    userFilters.lastName = {
                        contains: filters.lastName,
                        mode: 'insensitive',
                    };
                }
                if (filters.email) {
                    userFilters.email = {
                        contains: filters.email,
                        mode: 'insensitive',
                    };
                }

                // Фильтр по статусу
                if (filters.status) {
                    userFilters.status = {equals: filters.status};
                }

                // ВАЖНО: Принудительно role='CUSTOMER'
                userFilters.role = {equals: 'CUSTOMER'};

                // Если есть хотя бы один фильтр пользователя, подставляем
                if (Object.keys(userFilters).length > 0) {
                    where.user = userFilters;
                }

                return where;
            },
        }
    );
};
