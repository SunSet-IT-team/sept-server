import {Router} from 'express';
import * as OrderController from './controllers';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {validateDto} from '../../middleware/validate';
import {CreateOrderDTO} from './dto/createOrder.dto';
import {UpdateStatusDTO} from './dto/updateStatus.dto';
import {CompleteOrderDTO} from './dto/completeOrder.dto';

export const orderRouter = Router();

orderRouter.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Работа с заказами
 */

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
 *                 example: Нужно откачать септик
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
 *     summary: Получить все заказы
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список заказов
 */
orderRouter.get('/', OrderController.getOrders);

/**
 * @swagger
 * /orders/my:
 *   get:
 *     summary: Получить свои заказы
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *         description: Фильтрация по статусу
 *     responses:
 *       200:
 *         description: Список заказов
 */
orderRouter.get('/my', OrderController.getMyOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Получить заказ по ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заказ найден
 */
orderRouter.get('/:id', OrderController.getById);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Изменить статус заказа
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *                 example: IN_PROGRESS
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

/**
 * @swagger
 * /orders/{id}/complete:
 *   patch:
 *     summary: Завершить заказ с отчётом
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - report
 *             properties:
 *               report:
 *                 type: string
 *                 example: Откачка завершена. Клиент доволен.
 *     responses:
 *       200:
 *         description: Заказ завершён
 */
orderRouter.patch(
    '/:id/complete',
    roleMiddleware(['EXECUTOR']),
    validateDto(CompleteOrderDTO),
    OrderController.completeOrder
);

/**
 * @swagger
 * /orders/{id}/reject:
 *   patch:
 *     summary: Отклонить заказ (только для себя)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заказ отклонён для текущего исполнителя
 */
orderRouter.patch(
    '/:id/reject',
    roleMiddleware(['EXECUTOR']),
    OrderController.rejectOrder
);

/**
 * @swagger
 * /orders/{id}/accept:
 *   patch:
 *     summary: Взять заказ в работу (исполнитель)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заказ принят в работу
 */
orderRouter.patch(
    '/:id/accept',
    roleMiddleware(['EXECUTOR']),
    OrderController.acceptOrder
);

/**
 * @swagger
 * /orders/available:
 *   get:
 *     summary: Получить доступные заказы (неотклонённые и непринятые)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список доступных заказов
 */
orderRouter.get(
    '/available',
    roleMiddleware(['EXECUTOR']),
    OrderController.getAvailableOrders
);
