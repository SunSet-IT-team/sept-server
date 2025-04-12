// modules/chat/services/getAllChats.service.ts
import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';
import {GetChatsQueryDTO} from '../dtos/getChatsQuery.dto';

export const getChatsService = async (query: GetChatsQueryDTO) => {
    return paginate(prisma.chat, query, {
        defaultSortBy: 'createdAt',
        defaultOrder: 'desc',
        include: {
            participants: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            role: true,
                        },
                    },
                },
            },
            order: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
        transformFilters: (filters) => {
            const where: any = {};

            if (filters.type) {
                where.type = filters.type;
            }

            if (filters.orderId) {
                where.orderId = filters.orderId;
            }

            return where;
        },
    });
};
