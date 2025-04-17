import {Router} from 'express';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {getOrderChat} from '../controllers/getOrderChat.controller';
import {getMessagesByChatId} from '../controllers/getMessageByChatId.controller';
import {getSupportChat} from '../controllers/getSupportChat.controller';
import {checkRole} from '../../../core/middleware/checkRole';
import {Role} from '@prisma/client';
import {getAllChats} from '../controllers/getChats.controller';

export const chatRouter = Router();

chatRouter.get('/order/:id', authMiddleware, getOrderChat);
chatRouter.get('/:id/messages', authMiddleware, getMessagesByChatId);
chatRouter.post('/support', authMiddleware, getSupportChat);
chatRouter.get('/support', checkRole(Role.ADMIN), getAllChats);
