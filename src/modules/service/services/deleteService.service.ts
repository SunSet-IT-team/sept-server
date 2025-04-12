import {prisma} from '../../../core/database/prisma';

export const deleteServiceService = async (id: string) => {
    return await prisma.service.delete({
        where: {id},
    });
};
