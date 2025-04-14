import {prisma} from '../../../core/database/prisma';

interface UpdateReviewData {
    reviewId: number;
    text?: string;
    rating?: number;
    userId: number; // кто пытается обновить
    userRole: string; // нужна роль, чтобы понимать, admin ли
}

export const updateReviewService = async ({
    reviewId,
    text,
    rating,
    userId,
    userRole,
}: UpdateReviewData) => {
    // Находим отзыв
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

    if (review.authorId !== userId && userRole !== 'ADMIN') {
        throw new Error('Нет прав на изменение отзыва');
    }

    // Обновляем
    const updatedReview = await prisma.review.update({
        where: {id: reviewId},
        data: {
            text: text ?? review.text,
            rating: rating ?? review.rating,
        },
        include: {
            author: true,
            target: true,
            order: true,
        },
    });

    if (review.order?.executor) {
        await recalcExecutorRating(review.order.executor.userId);
    }

    return updatedReview;
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
