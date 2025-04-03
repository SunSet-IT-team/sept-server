import {prisma} from '../../db/prisma';

export async function createReview(
    customerId: number,
    data: {
        orderId: number;
        rating: number;
        comment: string;
    }
) {
    const order = await prisma.order.findUnique({
        where: {id: data.orderId},
    });

    if (!order || order.customerId !== customerId) {
        throw new Error('Нет доступа к заказу');
    }

    if (order.status !== 'COMPLETED') {
        throw new Error('Отзыв можно оставить только после завершения заказа');
    }

    return prisma.review.create({
        data: {
            orderId: data.orderId,
            rating: data.rating,
            comment: data.comment,
        },
    });
}

export async function updateReview(
    customerId: number,
    reviewId: number,
    data: {
        rating: number;
        comment: string;
    }
) {
    const review = await prisma.review.findUnique({
        where: {id: reviewId},
        include: {
            order: true,
        },
    });

    if (!review || review.order.customerId !== customerId) {
        throw new Error('Нет доступа к отзыву');
    }

    return prisma.review.update({
        where: {id: reviewId},
        data: {
            rating: data.rating,
            comment: data.comment,
        },
    });
}

export async function deleteReview(customerId: number, reviewId: number) {
    const review = await prisma.review.findUnique({
        where: {id: reviewId},
        include: {
            order: true,
        },
    });

    if (!review || review.order.customerId !== customerId) {
        throw new Error('Нет доступа к отзыву');
    }

    return prisma.review.delete({where: {id: reviewId}});
}
