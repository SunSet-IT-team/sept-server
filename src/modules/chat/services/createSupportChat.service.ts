// src/modules/chat/services/createSupportChat.service.ts
import {ChatType, Role} from '@prisma/client';
import {prisma} from '../../../core/database/prisma';

export const createSupportChatService = async (
    userId: number,
    theme: string
) => {
    const user = await prisma.user.findUnique({where: {id: userId}});
    if (!user) throw new Error('Пользователь не найден');

    const type: ChatType =
        user.role === Role.CUSTOMER
            ? ChatType.SUPPORT_CUSTOMER
            : ChatType.SUPPORT_EXECUTOR;

    return prisma.chat.create({
        data: {
            type,
            theme,
            participants: {
                create: {userId},
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
