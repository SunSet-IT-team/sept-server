import {prisma} from '../../../core/database/prisma';
import {getUserById} from '../../user/services/getUser';
import {toUserDto} from '../../user/utils/toUser';

export const getExecutorProfileService = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            files: {
                select: {
                    id: true,
                    url: true,
                    filename: true,
                    type: true,
                },
            },
            executorOrders: true,
            executorProfile: true,
        },
    });

    if (!user || !user.executorProfile) {
        throw new Error('Профиль исполнителя не найден');
    }

    return getUserById(user.id);
};
