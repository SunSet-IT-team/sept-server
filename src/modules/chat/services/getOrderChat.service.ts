// src/modules/chat/services/getOrCreateOrderChatForUser.service.ts
import {prisma} from '../../../core/database/prisma';
import {ChatType} from '@prisma/client';
import {getUserById} from '../../user/services/getUser';

export const getOrCreateOrderChatForUser = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
        select: {
            customerId: true,
            executorId: true,
            service: {select: {name: true}},
        },
    });
    if (!order) throw new Error('Заказ не найден');

    const defaultTheme = `Заявка №${orderId}\nУслуга: ${
        order.service?.name ?? '—'
    }`;

    const mainParticipants = [order.customerId, order.executorId].filter(
        Boolean
    ) as number[];

    let chat = await prisma.chat.findFirst({
        where: {orderId, type: ChatType.ORDER_CUSTOMER},
        include: {
            participants: true,
            messages: {orderBy: {createdAt: 'asc'}, include: {sender: true}},
        },
    });

    if (!chat) {
        chat = await prisma.chat.create({
            data: {
                orderId,
                type: ChatType.ORDER_CUSTOMER,
                theme: defaultTheme,
                participants: {
                    create: mainParticipants.map((id) => ({userId: id})),
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
        if (!chat.theme) {
            chat = await prisma.chat.update({
                where: {id: chat.id},
                data: {theme: defaultTheme},
                include: {
                    participants: true,
                    messages: {
                        orderBy: {createdAt: 'asc'},
                        include: {sender: true},
                    },
                },
            });
        }

        const existingIds = new Set(chat.participants.map((p) => p.userId));
        const toAdd = mainParticipants.filter((id) => !existingIds.has(id));

        if (toAdd.length) {
            await prisma.chatParticipant.createMany({
                data: toAdd.map((id) => ({chatId: chat!.id, userId: id})),
                skipDuplicates: true,
            });
            chat.participants.push(
                ...toAdd.map(
                    (id) => ({id: 0, chatId: chat!.id, userId: id} as any)
                )
            );
        }
    }

    const participantsWithUsers = await Promise.all(
        chat.participants.map(async (p) => ({
            ...p,
            user: await getUserById(p.userId),
        }))
    );

    return {...chat, participants: participantsWithUsers};
};
