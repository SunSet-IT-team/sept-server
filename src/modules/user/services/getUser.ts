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
            customerProfile: {
                include: {
                    addresses: true,
                },
            },
            favoritesGiven: {
                select: {
                    executorId: true,
                },
            },
            _count: {
                select: {
                    customerOrders: true,
                    executorOrders: true,
                    reviewsReceived: true,
                    reviewsGiven: true,
                },
            },
        },
    });

    if (!user) {
        throw new Error('Пользователь не найден');
    }

    const favoriteIds = user.favoritesGiven.map((f) => ({id: f.executorId}));

    const enrichedUser = {
        ...user,
        customerProfile: user.customerProfile
            ? {
                  ...user.customerProfile,
                  favoriteIds,
              }
            : null,
    };

    return toUserDto(enrichedUser);
};
