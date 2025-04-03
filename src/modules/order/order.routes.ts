import {Router} from 'express';
import * as OrderController from './order.controller';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {validateDto} from '../../middleware/validate';
import {CreateOrderDTO} from './dto/createOrder.dto';
import {UpdateStatusDTO} from './dto/updateStatus.dto';

export const orderRouter = Router();

orderRouter.use(authMiddleware);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Создать заказ
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - city
 *               - description
 *             properties:
 *               serviceId:
 *                 type: integer
 *                 example: 1
 *               city:
 *                 type: string
 *                 example: Москва
 *               description:
 *                 type: string
 *                 example: Нужно что-то сделать
 *     responses:
 *       201:
 *         description: Заказ создан
 */
orderRouter.post(
    '/',
    roleMiddleware(['CUSTOMER']),
    validateDto(CreateOrderDTO),
    OrderController.createOrder
);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Получить список заказов
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список заказов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
orderRouter.get('/', OrderController.getOrders);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Изменить статус заказа (только для исполнителя)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [IN_PROGRESS, COMPLETED, CANCELLED]
 *     responses:
 *       200:
 *         description: Статус обновлён
 */
orderRouter.patch(
    '/:id/status',
    roleMiddleware(['EXECUTOR']),
    validateDto(UpdateStatusDTO),
    OrderController.updateStatus
);
