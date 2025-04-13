import {Server, Socket} from 'socket.io';
import {prisma} from '../../../core/database/prisma';

export const registerOrderChatHandlers = (io: Server, socket: Socket) => {
    socket.on('joinOrderChat', async (orderId: string) => {
        const chat = await prisma.chat.findFirst({
            where: {
                orderId,
                type: 'ORDER_CUSTOMER',
            },
        });

        if (!chat) {
            return socket.emit('error', 'Чат по заказу не найден');
        }

        socket.join(chat.id);
        socket.emit('joinedChat', chat.id);
    });

    socket.on('sendMessage', async ({chatId, text}) => {
        if (!text) return;

        const message = await prisma.message.create({
            data: {
                chatId,
                senderId: socket.user!.id,
                text,
            },
        });

        io.to(chatId).emit('newMessage', message);
    });
};
