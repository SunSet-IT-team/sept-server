import {prisma} from '../../../core/database/prisma';

export const getExecutorProfileByIdService = async (id: string) => {
    return await prisma.executorProfile.findUnique({
        where: {userId: id},
        include: {
            user: true,
            orders: true,
        },
    });
};
