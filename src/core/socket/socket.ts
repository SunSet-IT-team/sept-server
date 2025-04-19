import {Server, Socket} from 'socket.io';
import jwt from 'jsonwebtoken';
import {prisma} from '../database/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

type SocketWithUser = Socket & {
    user?: {id: number; role: string};
};

export const configureSocket = (io: Server) => {
    // JWT Middleware
    io.use((socket: SocketWithUser, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('No token provided'));

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            socket.user = {
                id: decoded.sub,
                role: decoded.role,
            };
            next();
        } catch {
            next(new Error('Unauthorized'));
        }
    });

    io.on('connection', (socket: SocketWithUser) => {
        const userId = socket.user?.id;
        console.log(`🔌 Socket подключен: ${userId}`);

        // Join chat room
        socket.on('joinChat', async ({chatId}) => {
            if (!chatId) return;
            socket.join(chatId);
        });

        // Send message
        socket.on(
            'sendMessage',
            async ({chatId, text, tempId, fileIds = []}) => {
                if (!chatId || !userId || (!text && fileIds.length === 0))
                    return;

                try {
                    const message = await prisma.message.create({
                        data: {
                            chatId,
                            senderId: userId,
                            text,
                            files: {
                                connect: Array.isArray(fileIds)
                                    ? fileIds.map((id: number) => ({id}))
                                    : [],
                            },
                        },
                        include: {
                            sender: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    role: true,
                                },
                            },
                            files: true,
                        },
                    });

                    // Отправляем сообщение всем в комнате (кроме отправителя)
                    socket.to(chatId).emit('newMessage', {
                        ...message,
                        isMine: false,
                        tempId,
                    });

                    // Отправляем сообщение отправителю (чтобы он тоже увидел сразу)
                    socket.emit('newMessage', {
                        ...message,
                        isMine: true,
                        tempId,
                    });
                } catch (err) {
                    console.error('[sendMessage error]', err);
                    socket.emit('error', 'Ошибка при отправке сообщения');
                }
            }
        );

        socket.on('markAsRead', async ({messageId, chatId}) => {
            console.error('messageId', messageId, userId);
            if (!messageId || !userId) return;

            try {
                // 1. Находим сообщение и проверяем, что оно не от текущего пользователя
                const message = await prisma.message.findUnique({
                    where: {id: messageId},
                    select: {
                        id: true,
                        senderId: true,
                        chatId: true,
                        isReaded: true,
                    },
                });

                if (!message) {
                    return socket.emit('error', 'Сообщение не найдено');
                }

                if (message.senderId === userId) {
                    console.error(' Не обновляем статус для своих сообщений');
                    return; // Не обновляем статус для своих сообщений
                }

                // 2. Обновляем только если оно еще не прочитано
                if (!message.isReaded) {
                    await prisma.message.update({
                        where: {id: messageId},
                        data: {isReaded: true},
                    });

                    // 3. Уведомляем всех в чате о прочтении
                    socket.to(chatId).emit('messageRead', {
                        messageId,
                        readBy: userId,
                        chatId: chatId,
                    });

                    console.error('message.chatId', chatId);
                    console.error('emit messageRead');
                }
            } catch (err) {
                console.error('[markAsRead error]', err);
                socket.emit('error', 'Ошибка при обновлении статуса');
            }
        });

        socket.on('disconnect', () => {
            console.log(`❌ Отключён: ${userId}`);
        });
    });
};
