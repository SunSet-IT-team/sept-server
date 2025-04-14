import {prisma} from '../../../core/database/prisma';

interface DeleteReviewData {
    reviewId: number;
    userId: number;
    userRole: string;
}

export const deleteReviewService = async ({
    reviewId,
    userId,
    userRole,
}: DeleteReviewData) => {
    // Найти отзыв
    const review = await prisma.review.findUnique({
        where: {id: reviewId},
        include: {
            order: {
                include: {
                    executor: true,
                },
            },
        },
    });

    if (!review) {
        throw new Error('Отзыв не найден');
    }

    // Проверка прав: либо автор, либо ADMIN
    if (review.authorId !== userId && userRole !== 'ADMIN') {
        throw new Error('Нет прав на удаление отзыва');
    }

    const executorUserId = review.order?.executor?.userId;

    // Удаляем отзыв
    await prisma.review.delete({
        where: {id: reviewId},
    });

    // Пересчитываем рейтинг, если есть executor
    if (executorUserId) {
        await recalcExecutorRating(executorUserId);
    }

    return {message: 'Отзыв удалён'};
};

async function recalcExecutorRating(executorUserId: number) {
    const reviews = await prisma.review.findMany({
        where: {targetId: executorUserId},
        select: {rating: true},
    });
    if (!reviews.length) {
        await prisma.executorProfile.update({
            where: {userId: executorUserId},
            data: {rating: 0},
        });
        return;
    }
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / reviews.length;
    await prisma.executorProfile.update({
        where: {userId: executorUserId},
        data: {rating: average},
    });
}
