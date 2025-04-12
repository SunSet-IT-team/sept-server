import {Server} from 'socket.io';
import {Server as HTTPServer} from 'http';
import {configureSocket} from '../../core/socket/socket';

let io: Server;

export const initSocket = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    configureSocket(io);
};

export const getIO = () => {
    if (!io) throw new Error('Socket.IO не инициализирован');
    return io;
};
