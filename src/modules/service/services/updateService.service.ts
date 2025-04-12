import {prisma} from '../../../core/database/prisma';
import {UpdateServiceDTO} from '../dtos/updateService.dto';

export const updateServiceService = async (
    id: string,
    serviceData: UpdateServiceDTO
) => {
    return await prisma.service.update({
        where: {id},
        data: serviceData,
    });
};
