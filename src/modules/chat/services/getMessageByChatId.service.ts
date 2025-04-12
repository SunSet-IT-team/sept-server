import {prisma} from '../../../core/database/prisma';
import {paginate, PaginationParams} from '../../../core/utils/pagination';

export const getMessagesByChatIdService = async (
    chatId: string,
    query: PaginationParams
) => {
    return paginate(prisma.message, query, {
        defaultSortBy: 'createdAt',
        defaultOrder: 'asc',
        include: {
            sender: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                },
            },
            files: true,
        },
        transformFilters: () => ({
            chatId,
        }),
    });
};
