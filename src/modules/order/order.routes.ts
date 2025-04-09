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
 *     summary: Создать новый заказ
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
 *               - objectType
 *               - distanceToSeptic
 *               - septicDepth
 *               - septicVolume
 *               - septicConstructionType
 *               - paymentMethod
 *               - workDate
 *             properties:
 *               serviceId:
 *                 type: integer
 *                 description: ID услуги
 *                 example: 5
 *               objectType:
 *                 type: string
 *                 description: Тип объекта
 *                 example: "Частный дом"
 *               distanceToSeptic:
 *                 type: number
 *                 minimum: 0.1
 *                 description: Расстояние до септика (должно быть положительным)
 *                 example: 10.5
 *               septicDepth:
 *                 type: number
 *                 minimum: 0.1
 *                 description: Глубина септика (должна быть положительной)
 *                 example: 2.5
 *               septicVolume:
 *                 type: number
 *                 minimum: 0.1
 *                 description: Объём септика (должен быть положительным)
 *                 example: 5.0
 *               septicConstructionType:
 *                 type: string
 *                 description: Тип конструкции септика
 *                 example: "Бетонные кольца"
 *               paymentMethod:
 *                 type: string
 *                 description: Способ оплаты
 *                 example: "Наличные"
 *               workDate:
 *                 type: string
 *                 format: date-time
 *                 description: Дата выполнения работ
 *                 example: "2023-12-15T10:00:00Z"
 *               comment:
 *                 type: string
 *                 description: Дополнительный комментарий
 *                 example: "Вход со стороны двора"
 *     responses:
 *       201:
 *         description: Заказ успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID созданного заказа
 *                 customer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     customerProfile:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                 service:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                 status:
 *                   type: string
 *                   enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *                   description: Статус заказа
 *       400:
 *         description: Неверные параметры запроса (валидация не пройдена)
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Недостаточно прав (требуется роль CUSTOMER)
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
// orderRouter.get('/', OrderController.getOrders);

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

/**
 * @swagger
 * /orders/admin:
 *   get:
 *     summary: Получить все заказы (только для админов)
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
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: [createdAt, customer, executor, service, status]
 *       - name: order
 *         in: query
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - name: customerId
 *         in: query
 *         schema:
 *           type: integer
 *       - name: executorId
 *         in: query
 *         schema:
 *           type: integer
 *       - name: serviceId
 *         in: query
 *         schema:
 *           type: integer
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *     responses:
 *       200:
 *         description: Список заказов
 */
orderRouter.get(
    '/',
    roleMiddleware(['ADMIN']),
    OrderController.getAllOrdersForAdmin
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Удалить заказ по ID (только админ)
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
 *         description: Заказ удалён
 *       404:
 *         description: Заказ не найден
 */
orderRouter.delete(
    '/:id',
    roleMiddleware(['ADMIN']),
    OrderController.deleteOrder
);
