import {prisma} from '../../db/prisma';

export async function addToFavorites(customerId: number, executorId: number) {
    if (customerId === executorId) {
        throw new Error('Нельзя добавить самого себя в избранное');
    }

    const executor = await prisma.user.findUnique({where: {id: executorId}});
    if (!executor || executor.role !== 'EXECUTOR') {
        throw new Error('Пользователь не является исполнителем');
    }

    return prisma.favorite.create({
        data: {customerId, executorId},
    });
}

export async function removeFromFavorites(
    customerId: number,
    executorId: number
) {
    return prisma.favorite.delete({
        where: {
            customerId_executorId: {
                customerId,
                executorId,
            },
        },
    });
}

export async function getFavorites(customerId: number) {
    return prisma.favorite.findMany({
        where: {customerId},
        include: {
            executor: {
                include: {
                    executorProfile: true,
                },
            },
        },
    });
}
