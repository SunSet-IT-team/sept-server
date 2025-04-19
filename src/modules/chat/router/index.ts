import {Router} from 'express';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {getOrderChat} from '../controllers/getOrderChat.controller';
import {getMessagesByChatId} from '../controllers/getMessageByChatId.controller';
import {checkRole} from '../../../core/middleware/checkRole';
import {Role} from '@prisma/client';
import {getAllChats} from '../controllers/getChats.controller';
import {createSupportChat} from '../controllers/createSupportChat.controller';
import {getSupportChat} from '../controllers/getSupportChat.controller';

export const chatRouter = Router();

chatRouter.get('/order/:id', authMiddleware, getOrderChat);
chatRouter.get('/:id/messages', authMiddleware, getMessagesByChatId);

chatRouter.get('/support', authMiddleware, getSupportChat);
chatRouter.post('/support', authMiddleware, createSupportChat);

chatRouter.get('/support/admin', checkRole(Role.ADMIN), getAllChats);
