import {Socket} from 'socket.io';
import {ExtendedError} from 'socket.io/dist/namespace';
import {decodeJwtToken} from '../../auth/utils/jwt';

export const authenticateSocket = (
    socket: Socket,
    next: (err?: ExtendedError | undefined) => void
) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Нет токена'));
    }

    try {
        const payload = decodeJwtToken(token);
        socket.user = {
            id: payload.id,
            role: payload.role,
        };
        next();
    } catch (err) {
        return next(new Error('Неверный токен'));
    }
};
