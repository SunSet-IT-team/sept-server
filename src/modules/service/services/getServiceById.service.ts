import {prisma} from '../../../core/database/prisma';

export const getServiceByIdService = async (id: string) => {
    return await prisma.service.findUnique({
        where: {id},
    });
};
