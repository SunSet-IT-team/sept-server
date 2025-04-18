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
    // Найти отзыв с заказом
    const review = await prisma.review.findUnique({
        where: {id: reviewId},
        include: {
            order: true,
        },
    });

    if (!review) {
        throw new Error('Отзыв не найден');
    }

    if (review.authorId !== userId && userRole !== 'ADMIN') {
        throw new Error('Нет прав на удаление отзыва');
    }

    const executorUserId = review.order?.executorId;

    // Удаляем отзыв
    await prisma.review.delete({
        where: {id: reviewId},
    });

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
