import {prisma} from '../../../core/database/prisma';
import {UpdateCustomerDTO} from '../dtos/updateExecutorProfile.dto';

export const updateCustomerProfileService = async (
    userId: number,
    data: UpdateCustomerDTO
) => {
    return prisma.user.update({
        where: {id: userId},
        data,
        select: {id: true, firstName: true, lastName: true, phone: true},
    });
};
