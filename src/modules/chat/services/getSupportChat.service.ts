import {prisma} from '../../../core/database/prisma';

export const getSupportChatService = async (userId: number) => {
    return prisma.chat.findFirst({
        where: {
            type: {
                in: ['SUPPORT_CUSTOMER', 'SUPPORT_EXECUTOR'],
            },
            participants: {
                some: {userId},
            },
        },
        include: {
            participants: {
                include: {
                    user: true,
                },
            },
            messages: {
                include: {
                    sender: true,
                    files: true,
                },
                orderBy: {createdAt: 'asc'},
            },
        },
    });
};
