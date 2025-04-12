// routes/executor.routes.ts
import {Router} from 'express';
import {Role} from '@prisma/client';
import {checkRole} from '../../../core/middleware/checkRole';

const executorRouter = Router();

// Получение профиля исполнителя
executorRouter.get('/me', checkRole(Role.EXECUTOR), () => {});
executorRouter.patch('/me', checkRole(Role.EXECUTOR), () => {});

executorRouter.delete('/:id', checkRole(Role.ADMIN), () => {});
executorRouter.patch('/:id', checkRole(Role.ADMIN), () => {});

executorRouter.get('/:id', () => {});
// Получение заказов исполнителя с пагинацией
executorRouter.get('/:executorId/order', checkRole(Role.EXECUTOR), () => {});

// Получение рейтинга исполнителя
executorRouter.get('/:executorId/rating', checkRole(Role.EXECUTOR), () => {});

export default executorRouter;
