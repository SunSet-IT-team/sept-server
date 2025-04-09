import {AccountStatus, Prisma} from '@prisma/client';
import {prisma} from '../../../db/prisma';

interface GetCustomersParams {
    page?: number;
    perPage?: number;
    sortBy?: 'email' | 'name' | 'orderCount';
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

interface CustomerWithDetails {
    id: number;
    email: string;
    name: string | null;
    address: string | null;
    orderCount: number;
}

export async function getCustomers(params: GetCustomersParams = {}) {
    const {
        page = 1,
        perPage = 10,
        sortBy = 'email',
        sortOrder = 'asc',
        search = '',
    } = params;

    const where: Prisma.UserWhereInput = {
        role: 'CUSTOMER',
        status: AccountStatus['VERIFIED'] || AccountStatus['UNVERIFIED'],
        OR: search
            ? [
                  {email: {contains: search, mode: 'insensitive'}},
                  {
                      customerProfile: {
                          name: {contains: search, mode: 'insensitive'},
                      },
                  },
              ]
            : undefined,
    };

    const orderBy: Prisma.UserOrderByWithRelationInput = {
        ...(sortBy === 'orderCount'
            ? {ordersAsCustomer: {_count: sortOrder}}
            : sortBy === 'name'
            ? {customerProfile: {name: sortOrder}}
            : {[sortBy]: sortOrder}),
    };

    const [customers, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy,
            select: {
                id: true,
                email: true,
                customerProfile: {
                    select: {
                        name: true,
                        address: true,
                    },
                },
                _count: {
                    select: {
                        ordersAsCustomer: true,
                    },
                },
            },
        }),
        prisma.user.count({where}),
    ]);

    const formattedCustomers: CustomerWithDetails[] = customers.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.customerProfile?.name || null,
        address: user.customerProfile?.address || null,
        orderCount: user._count.ordersAsCustomer,
    }));

    return {
        data: formattedCustomers,
        meta: {
            total,
            page,
            perPage,
            totalPages: Math.ceil(total / perPage),
        },
    };
}
