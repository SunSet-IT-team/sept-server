import {prisma} from '../../../core/database/prisma';

interface ToggleFavoriteData {
    userId: number;
    executorId: number;
}

export const toggleFavoriteService = async ({
    userId,
    executorId,
}: ToggleFavoriteData) => {
    const customer = await prisma.customerProfile.findUnique({where: {userId}});
    if (!customer) throw new Error('Профиль заказчика не найден');

    const existing = await prisma.favorite.findUnique({
        where: {
            customerId_executorId: {
                customerId: customer.id,
                executorId,
            },
        },
    });

    if (existing) {
        await prisma.favorite.delete({
            where: {
                customerId_executorId: {
                    customerId: customer.id,
                    executorId,
                },
            },
        });
        return {message: 'Удалено из избранного'};
    }

    await prisma.favorite.create({
        data: {
            customerId: customer.id,
            executorId,
        },
    });

    return {message: 'Добавлено в избранное'};
};
