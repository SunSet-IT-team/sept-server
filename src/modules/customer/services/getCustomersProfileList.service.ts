import {Prisma} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';
import {getUserById} from '../../user/services/getUser';
import {toUserDto} from '../../user/utils/toUser';

export const getCustomersListService = async (query: any) => {
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

    const result = await paginate(
        prisma.customerProfile,
        {page, limit, sortBy, order, filters},
        {
            defaultSortBy: 'priority',
            defaultOrder: 'asc',
            include: {
                user: true,
                addresses: true,
            },
            orderMap,
            transformFilters: (filters) => {
                const where: Prisma.CustomerProfileWhereInput = {};
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
                if (filters.email) {
                    userFilters.email = {
                        contains: filters.email,
                        mode: 'insensitive',
                    };
                }
                if (filters.status) {
                    userFilters.status = {equals: filters.status};
                }

                userFilters.role = {equals: 'CUSTOMER'};

                if (Object.keys(userFilters).length > 0) {
                    where.user = userFilters;
                }

                return where;
            },
        }
    );

    console.log(result, 3142);

    const items = await Promise.all(
        result.items.map(async (customerProfile) => {
            return await getUserById(customerProfile.userId);
            // return toUserDto(user);
        })
    );

    return {
        ...result,
        items,
    };
};
