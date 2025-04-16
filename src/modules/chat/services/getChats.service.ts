// modules/chat/services/getAllChats.service.ts
import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';
import {GetChatsQueryDTO} from '../dtos/getChatsQuery.dto';
import {getUserById} from '../../user/services/getUser';

export const getChatsService = async (query: GetChatsQueryDTO) => {
    const result = await paginate(prisma.chat, query, {
        defaultSortBy: 'createdAt',
        defaultOrder: 'desc',
        include: {
            participants: {
                include: {
                    user: true,
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

    // Обновим участников чатов через toUserDto
    const transformedItems = await Promise.all(
        result.items.map(async (chat: any) => {
            const participants = await Promise.all(
                chat.participants.map(async (participant: any) => {
                    const userDto = await getUserById(participant.userId);
                    return {
                        ...participant,
                        user: userDto,
                    };
                })
            );

            return {
                ...chat,
                participants,
            };
        })
    );

    return {
        ...result,
        items: transformedItems,
    };
};
