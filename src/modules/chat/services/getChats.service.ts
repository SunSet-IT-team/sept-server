import {prisma} from '../../../core/database/prisma';
import {paginate} from '../../../core/utils/pagination';
import {GetChatsQueryDTO} from '../dtos/getChatsQuery.dto';
import {getUserById} from '../../user/services/getUser';
import {ChatType} from '@prisma/client';

export const getChatsService = async (
    query: GetChatsQueryDTO,
    currentUserId: number
) => {
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
            _count: {
                select: {
                    messages: {
                        where: {
                            OR: [{isReaded: false}, {isReaded: null}],
                            senderId: {not: currentUserId},
                        },
                    },
                },
            },
        },
        transformFilters: (filters) => {
            const where: any = {};

            where.type = {
                in: [
                    ChatType.ORDER_ADMIN,
                    ChatType.SUPPORT_CUSTOMER,
                    ChatType.SUPPORT_EXECUTOR,
                ],
            };

            if (filters.type) {
                where.type = filters.type;
            }

            if (filters.orderId) {
                where.orderId = filters.orderId;
            }

            return where;
        },
    });

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
                newMessages: chat._count.messages,
            };
        })
    );

    return {
        ...result,
        items: transformedItems,
    };
};
