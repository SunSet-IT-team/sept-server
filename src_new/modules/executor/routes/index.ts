// routes/executor.routes.ts
import {Router} from 'express';
import {Role} from '@prisma/client';
import {checkRole} from '../../../core/middleware/checkRole';
import {getExecutorProfile} from '../controllers/getExecutorProfile.controller';
import {authMiddleware} from '../../../core/middleware/authMiddleware';

const executorRouter = Router();

// Получение профиля исполнителя
executorRouter.get('/me', checkRole(Role.EXECUTOR), getExecutorProfile);
executorRouter.patch('/me', checkRole(Role.EXECUTOR), () => {});

executorRouter.delete('/:id', checkRole(Role.ADMIN), () => {});
executorRouter.patch('/:id', checkRole(Role.ADMIN), () => {});

executorRouter.get('/:id', authMiddleware, getExecutorProfile);
// Получение заказов исполнителя с пагинацией
executorRouter.get('/:executorId/order', checkRole(Role.EXECUTOR), () => {});

// Получение рейтинга исполнителя
executorRouter.get('/:executorId/rating', checkRole(Role.EXECUTOR), () => {});

export default executorRouter;
