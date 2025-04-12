import {AccountStatus} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';

export const deleteCustomerProfileService = async (userId: string) => {
    return prisma.user.update({
        where: {id: userId},
        data: {status: AccountStatus.DELETED},
    });
};
