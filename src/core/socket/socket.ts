import {Server, Socket} from 'socket.io';
import jwt from 'jsonwebtoken';
import {prisma} from '../database/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

type SocketWithUser = Socket & {
    user?: {id: string; role: string};
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
                                    ? fileIds.map((id: string) => ({id}))
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

        // Mark messages as read
        socket.on('markAsRead', async ({chatId}) => {
            if (!chatId || !userId) return;
            // Логика отметки прочтения. Например, уведомляем других:
            socket
                .to(chatId)
                .emit('readReceipt', {userId, chatId, timestamp: new Date()});
        });

        socket.on('disconnect', () => {
            console.log(`❌ Отключён: ${userId}`);
        });
    });
};
