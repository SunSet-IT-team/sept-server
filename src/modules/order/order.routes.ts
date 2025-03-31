import {Router} from 'express';
import * as OrderController from './order.controller';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {validateDto} from '../../middleware/validate';
import {CreateOrderDTO} from './dto/createOrder.dto';
import {UpdateStatusDTO} from './dto/updateStatus.dto';

export const orderRouter = Router();

orderRouter.use(authMiddleware);

// только заказчики могут создавать
orderRouter.post(
    '/',
    roleMiddleware(['CUSTOMER']),
    validateDto(CreateOrderDTO),
    OrderController.createOrder
);

// все авторизованные могут смотреть
orderRouter.get('/', OrderController.getOrders);

// только исполнители могут менять статус
orderRouter.patch(
    '/:id/status',
    roleMiddleware(['EXECUTOR']),
    validateDto(UpdateStatusDTO),
    OrderController.updateStatus
);
