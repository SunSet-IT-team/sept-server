import {prisma} from '../../../core/database/prisma';
import {toUserDto} from '../utils/toUser';

export const getUserById = async (userId: number) => {
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
            executorProfile: true,
            customerOrders: true,
            executorOrders: true,
            customerProfile: {
                include: {
                    addresses: true,
                },
            },
        },
    });

    if (!user) throw new Error('Пользователь не найден');

    return toUserDto(user);
};
