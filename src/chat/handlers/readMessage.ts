import {Socket} from 'socket.io';
import {prisma} from '../../db/prisma';
import {io} from '../index';

export async function handleReadMessage(
    socket: Socket,
    userId: number,
    messageId: number
) {
    const message = await prisma.message.findUnique({
        where: {id: messageId},
        include: {chat: {include: {order: true}}},
    });

    if (!message) return;

    const {order} = message.chat;
    if (![order.customerId, order.executorId].includes(userId)) return;

    const already = await prisma.messageRead.findFirst({
        where: {messageId, userId},
    });
    if (already) return;

    await prisma.messageRead.create({
        data: {messageId, userId},
    });

    io.to(`chat:${message.chatId}`).emit('message:status', {
        id: messageId,
        status: 'read',
        userId,
    });
}
