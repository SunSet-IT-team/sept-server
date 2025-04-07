import {Server} from 'socket.io';
import {Server as HTTPServer} from 'http';
import jwt from 'jsonwebtoken';
import {handleJoin} from './handlers/join';
import {handleSendMessage} from './handlers/sendMessage';
import {handleReadMessage} from './handlers/readMessage';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export let io: Server;

export function initSocket(server: HTTPServer) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) return next(new Error('No token'));

            const payload = jwt.verify(token, JWT_SECRET) as {userId: number};
            (socket as any).userId = payload.userId;

            next();
        } catch (err) {
            next(new Error('Unauthorized'));
        }
    });

    io.on('connection', (socket) => {
        const userId = (socket as any).userId;
        console.log('🔌 Подключён сокет:', socket.id, 'userId:', userId);

        socket.on('chat:join', (orderId: number) =>
            handleJoin(socket, userId, orderId)
        );
        socket.on('message:send', (payload) =>
            handleSendMessage(socket, userId, payload)
        );
        socket.on('message:read', (messageId: number) =>
            handleReadMessage(socket, userId, messageId)
        );

        socket.on('disconnect', () => {
            console.log('❌ Сокет отключился:', socket.id);
        });
    });

    return io;
}
