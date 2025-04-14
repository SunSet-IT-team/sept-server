import {prisma} from '../../../core/database/prisma';
import {ChatType} from '@prisma/client';

export const getOrCreateOrderChatForUser = async (
    orderId: number,
    userId: number
) => {
    let chat = await prisma.chat.findFirst({
        where: {
            orderId,
            type: ChatType.ORDER_CUSTOMER,
        },
        include: {
            participants: true,
            messages: {
                orderBy: {createdAt: 'asc'},
                include: {sender: true},
            },
        },
    });

    if (!chat) {
        chat = await prisma.chat.create({
            data: {
                orderId,
                type: ChatType.ORDER_CUSTOMER,
                participants: {
                    create: [{userId}],
                },
            },
            include: {
                participants: true,
                messages: {
                    orderBy: {createdAt: 'asc'},
                    include: {sender: true},
                },
            },
        });
    } else {
        const isInChat = chat.participants.some((p) => p.userId === userId);

        if (!isInChat) {
            await prisma.chatParticipant.create({
                data: {
                    chatId: chat.id,
                    userId,
                },
            });
        }
    }

    return chat;
};
