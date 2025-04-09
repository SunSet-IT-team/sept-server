import {prisma} from '../../../db/prisma';

export async function getCustomerById(id: number) {
    const customer = await prisma.user.findUnique({
        where: {
            id,
            role: 'CUSTOMER',
        },
        include: {
            customerProfile: true,
            ordersAsCustomer: {
                select: {
                    id: true,
                    status: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 10,
            },
            _count: {
                select: {
                    ordersAsCustomer: true,
                },
            },
        },
    });

    if (!customer) {
        return null;
    }

    if (customer.status === 'DELETED') {
        return {success: false, message: 'Пользователь удален'};
    }

    return {
        id: customer.id,
        email: customer.email,
        name: customer.customerProfile?.name || null,
        address: customer.customerProfile?.address || null,
        orders: customer.ordersAsCustomer,
        orderCount: customer._count.ordersAsCustomer,
        createdAt: customer.createdAt,
    };
}
