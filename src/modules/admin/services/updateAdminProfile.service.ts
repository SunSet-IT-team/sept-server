import {prisma} from '../../../core/database/prisma';
import {UpdateAdminDTO} from '../dtos/updateAdmin.dto';

export const updateAdminProfileService = async (
    userId: string,
    data: UpdateAdminDTO
) => {
    return prisma.user.update({
        where: {id: userId},
        data,
        select: {id: true, firstName: true, lastName: true, phone: true},
    });
};
