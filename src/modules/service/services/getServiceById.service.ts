import {prisma} from '../../../core/database/prisma';

export const getServiceByIdService = async (id: number) => {
    return await prisma.service.findUnique({
        where: {id},
    });
};
