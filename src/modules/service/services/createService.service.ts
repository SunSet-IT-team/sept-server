import {prisma} from '../../../core/database/prisma';
import {CreateServiceDTO} from '../dtos/createService.dto';

export const createServiceService = async (dto: CreateServiceDTO) => {
    return await prisma.service.create({
        data: {
            name: dto.name,
            priority: dto.priority,
        },
    });
};
