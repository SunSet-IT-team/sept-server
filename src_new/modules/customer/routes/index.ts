import {Router} from 'express';
import {Role} from '@prisma/client';
import {checkRole} from '../../../core/middleware/checkRole';

const customerRouter = Router();

/**
 * 👤 Текущий исполнитель (только EXECUTOR)
 */
customerRouter.get('/me', checkRole(Role.EXECUTOR), () => {});
customerRouter.patch('/me', checkRole(Role.EXECUTOR), () => {});

customerRouter.get('/list', checkRole([Role.ADMIN]), () => {});

customerRouter.get('/:id', () => {});
customerRouter.patch('/:id', checkRole(Role.ADMIN), () => {});
customerRouter.delete('/:id', checkRole(Role.ADMIN), () => {});

customerRouter.get(
    '/:executorId/orders',
    checkRole([Role.EXECUTOR, Role.ADMIN]),
    () => {}
);

customerRouter.get('/:executorId/reviews', () => {});

export default customerRouter;
