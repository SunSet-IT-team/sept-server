import {prisma} from '../../../core/database/prisma';

export const getAllServicesService = async () => {
    return await prisma.service.findMany();
};
