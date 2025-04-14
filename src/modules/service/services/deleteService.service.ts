import {prisma} from '../../../core/database/prisma';

export const deleteServiceService = async (id: number) => {
    return await prisma.service.delete({
        where: {id},
    });
};
