import {prisma} from '../../../core/database/prisma';

export const getExecutorProfileService = async (userId: string) => {
    const executor = await prisma.executorProfile.findUnique({
        where: {userId},
        include: {
            user: {
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    status: true,
                    files: true,
                },
            },
        },
    });

    if (!executor) {
        throw new Error('Профиль исполнителя не найден');
    }

    return {
        id: executor.id,
        workFormat: executor.workFormat,
        experience: executor.experience,
        about: executor.about,
        companyName: executor.companyName,
        description: executor.description,
        completedOrders: executor.completedOrders,
        rating: executor.rating,
        files: executor.user.files,
        user: executor.user,
    };
};
