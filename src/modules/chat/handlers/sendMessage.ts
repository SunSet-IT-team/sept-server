import {Socket} from 'socket.io';
import {prisma} from '../../../db/prisma';
import {io} from '../index';

export async function handleSendMessage(
    socket: Socket,
    userId: number,
    payload: {orderId: number; content?: string; fileUrl?: string}
) {
    const {orderId, content, fileUrl} = payload;

    const order = await prisma.order.findUnique({where: {id: orderId}});
    if (!order || ![order.customerId, order.executorId].includes(userId)) {
        return socket.emit('error', {message: 'Нет доступа к чату'});
    }

    const chat = await prisma.chat.findUnique({where: {orderId}});
    if (!chat) return socket.emit('error', {message: 'Чат не найден'});

    const message = await prisma.message.create({
        data: {
            chatId: chat.id,
            senderId: userId,
            content,
            fileUrl,
        },
    });

    io.to(`chat:${chat.id}`).emit('message:received', {
        id: message.id,
        chatId: chat.id,
        content,
        fileUrl,
        senderId: userId,
        createdAt: message.createdAt,
    });

    socket.emit('message:status', {id: message.id, status: 'sent'});
}
