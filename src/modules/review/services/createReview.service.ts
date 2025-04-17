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
    });

    if (!order) {
        throw new Error('Заказ не найден');
    }

    // Проверка, что автор — владелец заказа
    if (order.customerId !== authorId) {
        throw new Error('Вы не являетесь владельцем этого заказа');
    }

    if (!order.executorId) {
        throw new Error('У заказа нет исполнителя');
    }

    // Проверка, что отзыв ещё не был создан
    const existingReview = await prisma.review.findFirst({
        where: {
            authorId,
            targetId: order.executorId,
            orderId,
        },
    });

    if (existingReview) {
        throw new Error('Вы уже оставляли отзыв на этот заказ');
    }

    const review = await prisma.review.create({
        data: {
            text,
            rating,
            authorId,
            targetId: order.executorId,
            orderId,
        },
        include: {
            author: true,
            target: true,
            order: true,
        },
    });

    await recalcExecutorRating(order.executorId);

    return review;
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
