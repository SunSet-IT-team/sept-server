import {prisma} from '../../../core/database/prisma';
import {getUserById} from '../../user/services/getUser';
import {toOrderDto} from '../../order/utils/toOrder';
import {OrderDto, ReviewDto} from '../../order/dtos/order.dto';

export interface CreateReviewParams {
    orderId: number;
    authorId: number;
    text: string;
    rating: number;
}

export interface CreateReviewResult {
    review: ReviewDto;
    order: OrderDto;
}

export const createReviewService = async ({
    orderId,
    authorId,
    text,
    rating,
}: CreateReviewParams): Promise<CreateReviewResult> => {
    const orderMeta = await prisma.order.findUnique({
        where: {id: orderId},
        select: {customerId: true, executorId: true, title: true},
    });
    if (!orderMeta) throw new Error('Заказ не найден');
    if (orderMeta.customerId !== authorId) {
        throw new Error('Вы не являетесь владельцем этого заказа');
    }
    const executorUserId = orderMeta.executorId;
    if (!executorUserId) throw new Error('У заказа нет исполнителя');

    const exists = await prisma.review.findFirst({
        where: {authorId, targetId: executorUserId, orderId},
    });
    if (exists) throw new Error('Вы уже оставляли отзыв на этот заказ');

    const created = await prisma.review.create({
        data: {
            text,
            rating,
            authorId,
            targetId: executorUserId,
            orderId,
        },
    });

    const agg = await prisma.review.aggregate({
        where: {targetId: executorUserId},
        _avg: {rating: true},
    });
    await prisma.executorProfile.update({
        where: {userId: executorUserId},
        data: {rating: agg._avg.rating ?? 0},
    });

    const authorDto = await getUserById(authorId);
    const reviewDto: ReviewDto = {
        id: created.id,
        text: created.text!,
        rating: created.rating,
        createdAt: created.createdAt,
        author: authorDto,
    };

    const fullOrder = await prisma.order.findUnique({
        where: {id: orderId},
        include: {
            service: true,
            reports: {include: {files: true}},
            reviews: {
                include: {
                    author: {
                        include: {
                            files: true,
                            customerProfile: true,
                            executorProfile: true,
                            customerOrders: true,
                            executorOrders: true,
                            reviewsReceived: {select: {id: true}},
                        },
                    },
                },
            },
            chats: true,
        },
    });
    if (!fullOrder) throw new Error('Не удалось загрузить заказ');

    const baseOrderDto = await toOrderDto(fullOrder);
    const orderDto: OrderDto = {
        title: fullOrder.title || '',
        ...baseOrderDto,
        customerReview: reviewDto,
    };

    return {review: reviewDto, order: orderDto};
};
