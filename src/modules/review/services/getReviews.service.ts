import {prisma} from '../../../core/database/prisma';
import {
    paginate,
    PaginationParams,
    PaginatedResult,
} from '../../../core/utils/pagination';
import {Review} from '@prisma/client';
import {getUserById} from '../../user/services/getUser';
import {ReviewDto} from '../../order/dtos/order.dto';
import {toOrderDto} from '../../order/utils/toOrder';

export interface GetReviewsParams extends PaginationParams {
    senderId?: number;
    targetId?: number;
}

export const getReviewsService = async (
    params: GetReviewsParams
): Promise<PaginatedResult<ReviewDto>> => {
    const {senderId, targetId, ...pagination} = params;

    const raw = await paginate<Review>(
        prisma.review,
        {
            ...pagination,
        },
        {
            defaultSortBy: 'createdAt',
            defaultOrder: 'desc',
            select: {
                id: true,
                text: true,
                rating: true,
                createdAt: true,
                authorId: true,
                targetId: true,
                orderId: true,
            },
            transformFilters: () => {
                const where: Record<string, any> = {};
                if (senderId !== undefined) where.authorId = senderId;
                if (targetId !== undefined) where.targetId = targetId;
                return where;
            },
        }
    );

    const items: ReviewDto[] = await Promise.all(
        raw.items.map(async (rev) => {
            const [author, target] = await Promise.all([
                getUserById(rev.authorId),
                getUserById(rev.targetId),
            ]);

            const fullOrder = await prisma.order.findUnique({
                where: {id: rev.orderId!},
                include: {
                    service: true,
                    reports: {include: {files: true}},
                    reviews: {include: {author: true}},
                },
            });
            const orderDto = fullOrder ? await toOrderDto(fullOrder) : null;

            return {
                id: rev.id,
                text: rev.text,
                rating: rev.rating,
                createdAt: rev.createdAt,
                author,
                target,
                order: {id: orderDto?.id, title: orderDto?.objectType},
            };
        })
    );

    return {
        ...raw,
        items,
    };
};
