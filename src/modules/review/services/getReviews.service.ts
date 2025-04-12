import {prisma} from '../../../core/database/prisma';

export const getReviewsService = async (targetId: string) => {
    return prisma.review.findMany({
        where: {targetId},
        include: {
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                },
            },
            order: {
                select: {
                    id: true,
                    title: true,
                    status: true,
                },
            },
        },
        orderBy: {createdAt: 'desc'},
    });
};
