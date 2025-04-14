import {AccountStatus} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';

export const deleteCustomerProfileService = async (userId: number) => {
    return prisma.user.update({
        where: {id: userId},
        data: {status: AccountStatus.DELETED},
    });
};
