// executor.service.ts
import {prisma} from '../../db/prisma';

export async function updateExecutorProfile(userId: number, city: string) {
    return prisma.executorProfile.update({
        where: {userId},
        data: {city},
    });
}

export async function calculateExecutorRating(executorId: number): Promise<{
    averageRating: number;
    totalReviews: number;
}> {
    // Получаем все отзывы для этого исполнителя
    const reviews = await prisma.review.findMany({
        where: {
            order: {
                executorId: executorId,
            },
        },
        select: {
            rating: true,
        },
    });

    // Если отзывов нет, возвращаем 0
    if (reviews.length === 0) {
        return {
            averageRating: 0,
            totalReviews: 0,
        };
    }

    // Считаем сумму всех оценок
    const sum = reviews.reduce((total, review) => total + review.rating, 0);

    // Вычисляем средний рейтинг с округлением до 2 знаков
    const averageRating = parseFloat((sum / reviews.length).toFixed(2));

    return {
        averageRating,
        totalReviews: reviews.length,
    };
}
