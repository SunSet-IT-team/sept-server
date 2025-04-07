// src/modules/customer/customer.service.ts
import {prisma} from '../../db/prisma';

export async function updateCustomerProfile(userId: number, address: string) {
    return prisma.customerProfile.update({
        where: {userId},
        data: {address},
    });
}
