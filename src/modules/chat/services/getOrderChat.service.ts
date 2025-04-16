import {prisma} from '../../../core/database/prisma';
import {ChatType} from '@prisma/client';

export const getOrCreateOrderChatForUser = async (
    orderId: number,
    userId: number
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
        select: {
            customerId: true,
            executorId: true,
        },
    });

    if (!order) {
        throw new Error('Заказ не найден');
    }

    const isParticipant =
        userId === order.customerId || userId === order.executorId;

    if (!isParticipant) {
        throw new Error('Вы не имеете доступа к этому заказу');
    }

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

    // Если чата нет — создаём и добавляем только того, кто первый зашёл
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
        const existingParticipantIds = chat.participants.map((p) => p.userId);

        // Добавим участника, если его ещё нет
        const usersToAdd: number[] = [];

        if (
            order.customerId &&
            !existingParticipantIds.includes(order.customerId)
        ) {
            usersToAdd.push(order.customerId);
        }

        if (
            order.executorId &&
            !existingParticipantIds.includes(order.executorId)
        ) {
            usersToAdd.push(order.executorId);
        }

        for (const uid of usersToAdd) {
            await prisma.chatParticipant.create({
                data: {
                    chatId: chat.id,
                    userId: uid,
                },
            });
        }
    }

    return chat;
};
