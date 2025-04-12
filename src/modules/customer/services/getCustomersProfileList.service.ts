import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';

export const getCustomersListService = async (query: any) => {
    const orderMap: Record<string, any> = {
        firstName: {user: {firstName: query.order || 'asc'}},
        lastName: {user: {lastName: query.order || 'asc'}},
        createdAt: {createdAt: query.order || 'desc'},
    };

    const {page, limit, sortBy, order, ...filters} = query;

    return paginate(
        prisma.customerProfile,
        {page, limit, sortBy, order, filters},
        {
            defaultSortBy: 'createdAt',
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
                const userFilters: any = {};

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

                const where: any = {};
                if (Object.keys(userFilters).length) {
                    where.user = userFilters;
                }

                return where;
            },
        }
    );
};
