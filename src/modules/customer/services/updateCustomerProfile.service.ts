import {prisma} from '../../../db/prisma';

export async function updateCustomerProfile(
    userId: number,
    address: string,
    name: string
) {
    return prisma.customerProfile.update({
        where: {userId},
        data: {address, name},
    });
}
