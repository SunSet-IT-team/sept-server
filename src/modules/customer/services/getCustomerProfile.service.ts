import {prisma} from '../../../core/database/prisma';

export const getCustomerProfileService = async (userId: string) => {
    const customer = await prisma.customerProfile.findUnique({
        where: {userId},
        include: {user: true, addresses: true},
    });

    if (!customer) throw new Error('Заказчик не найден');
    return customer;
};
