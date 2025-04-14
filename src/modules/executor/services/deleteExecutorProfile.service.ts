import {prisma} from '../../../core/database/prisma';
import {AccountStatus} from '@prisma/client';

export const deleteExecutorProfileService = async (userId: number) => {
    const executor = await prisma.executorProfile.findUnique({
        where: {userId},
    });

    if (!executor) {
        throw new Error('Профиль исполнителя не найден');
    }

    await prisma.user.update({
        where: {id: userId},
        data: {
            status: AccountStatus.DELETED,
            statusUpdatedAt: new Date(),
        },
    });

    return {message: 'Профиль исполнителя помечен как удалённый'};
};
