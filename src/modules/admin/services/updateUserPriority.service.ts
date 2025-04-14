import {prisma} from '../../../core/database/prisma';
import {Role} from '@prisma/client';

export const updateUserPriorityService = async (
    userId: number,
    priority: number
) => {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            customerProfile: true,
            executorProfile: true,
        },
    });

    if (!user) throw new Error('Пользователь не найден');

    await prisma.user.update({
        where: {id: userId},
        data: {priority},
    });

    if (user.role === Role.CUSTOMER && user.customerProfile) {
        await prisma.customerProfile.update({
            where: {userId},
            data: {priority},
        });
    }

    if (user.role === Role.EXECUTOR && user.executorProfile) {
        await prisma.executorProfile.update({
            where: {userId},
            data: {priority},
        });
    }

    return {message: 'Приоритет успешно обновлён'};
};
