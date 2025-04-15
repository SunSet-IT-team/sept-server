import {Router} from 'express';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {getOrderChat} from '../controllers/getOrderChat.controller';
import {getMessagesByChatId} from '../controllers/getMessageByChatId.controller';
import {getSupportChat} from '../controllers/getSupportChat.controller';
import {checkRole} from '../../../core/middleware/checkRole';
import {Role} from '@prisma/client';

export const chatRouter = Router();

chatRouter.get('/order/:id', authMiddleware, getOrderChat);
chatRouter.get('/:id/messages', authMiddleware, getMessagesByChatId);
chatRouter.post('/order/:orderId/support', authMiddleware, getSupportChat);
chatRouter.get('/support', checkRole(Role.ADMIN), getSupportChat);

// chatRouter.post('/support', authMiddleware, getSupportChat); // Создать чат с админом
