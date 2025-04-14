import {prisma} from '../../../core/database/prisma';

interface CreateReviewData {
    orderId: number;
    text: string;
    rating: number;
    authorId: number;
}

export const createReviewService = async ({
    orderId,
    text,
    rating,
    authorId,
}: CreateReviewData) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
        include: {
            executor: true,
            customer: {include: {user: true}},
        },
    });

    if (!order) {
        throw new Error('Заказ не найден');
    }

    // Проверка, что автор - владелец заказа
    if (order.customer.userId !== authorId) {
        throw new Error('Вы не являетесь владельцем этого заказа');
    }

    if (!order.executor) {
        throw new Error('У заказа нет исполнителя');
    }

    // Проверяем, что у автора ещё нет отзыва по этому же заказу/исполнителю
    const existingReview = await prisma.review.findFirst({
        where: {
            authorId,
            targetId: order.executor.userId,
            orderId,
        },
    });

    if (existingReview) {
        throw new Error('Вы уже оставляли отзыв на этот заказ');
    }

    // Создаём отзыв
    const review = await prisma.review.create({
        data: {
            text,
            rating,
            authorId,
            targetId: order.executor.userId,
            orderId,
        },
        include: {
            author: true,
            target: true,
            order: true,
        },
    });

    // Теперь пересчитаем рейтинг исполнителя
    await recalcExecutorRating(order.executor.userId);

    return review;
};

/**
 * Пересчитываем средний рейтинг исполнителя по всем отзывам,
 * где targetId = userId исполнителя.
 */
async function recalcExecutorRating(executorUserId: number) {
    const reviews = await prisma.review.findMany({
        where: {targetId: executorUserId},
        select: {rating: true},
    });

    if (!reviews.length) {
        // Если отзывов нет, выставим rating = 0
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
