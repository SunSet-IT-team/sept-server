// routes/order.routes.ts
import {Router} from 'express';
import {checkRole} from '../../../core/middleware/checkRole';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {Role} from '@prisma/client';
import {createOrder} from '../controllers/createOrder.controller';
import {getMyOrders} from '../controllers/getMyOrders.controller';
import {getOrderById} from '../controllers/getOrderById.controller';
import {updateOrder} from '../controllers/updateOrder.controller';
import {UpdateOrderDTO} from '../dtos/updateOrder.dto';
import {validateDto} from '../../../core/utils/validateDto';
import {CreateOrderDTO} from '../dtos/createOrder.dto';
import {deleteOrder} from '../controllers/deleteOrder.controller';
import {acceptOrder} from '../controllers/acceptOrder.controller';
import {rejectOrder} from '../controllers/rejectOrder.controller';
import {upload} from '../../../core/middleware/upload';
import {completeOrder} from '../controllers/completeOrder.controller';

const orderRouter = Router();


orderRouter.get('/', authMiddleware, getMyOrders);

orderRouter.get('/my', checkRole([Role.CUSTOMER, Role.EXECUTOR]), getMyOrders);

orderRouter.get('/executor/:executorId', checkRole(Role.ADMIN), getMyOrders);
orderRouter.get('/customer/:customerId', checkRole(Role.ADMIN), getMyOrders);

orderRouter.get('/:id', authMiddleware, getOrderById);

orderRouter.patch(
    '/:id',
    validateDto(UpdateOrderDTO),
    checkRole([Role.CUSTOMER, Role.ADMIN]),
    updateOrder
);

orderRouter.delete('/:id', checkRole([Role.CUSTOMER, Role.ADMIN]), deleteOrder);

orderRouter.post('/:id/accept', checkRole(Role.EXECUTOR), acceptOrder);
orderRouter.post('/:id/reject', checkRole(Role.EXECUTOR), rejectOrder);

orderRouter.post(
    '/:id/complete',
    checkRole(Role.EXECUTOR),
    upload.fields([{name: 'reportFiles', maxCount: 10}]),
    completeOrder
);

orderRouter.post(
    '/',
    validateDto(CreateOrderDTO),
    checkRole(Role.CUSTOMER),
    createOrder
);

export default orderRouter;
