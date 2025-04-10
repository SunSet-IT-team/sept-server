import {Socket} from 'socket.io';
import {prisma} from '../../../db/prisma';

export async function handleJoin(
    socket: Socket,
    userId: number,
    orderId: number
) {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
    });

    if (!order || ![order.customerId, order.executorId].includes(userId)) {
        return socket.emit('error', {message: 'Нет доступа к чату'});
    }

    // Создаём чат при первом подключении
    const chat = await prisma.chat.upsert({
        where: {orderId},
        update: {},
        create: {orderId},
    });

    socket.join(`chat:${chat.id}`);
    console.log(`📥 user ${userId} вошёл в чат ${chat.id}`);

    // Загружаем историю сообщений
    const messages = await prisma.message.findMany({
        where: {chatId: chat.id},
        orderBy: {createdAt: 'asc'},
        include: {
            reads: true,
        },
    });

    socket.emit('chat:history', messages);
}
