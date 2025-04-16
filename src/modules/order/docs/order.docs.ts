/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Управление заказами
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Создать заказ
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - objectType
 *               - distanceToSeptic
 *               - septicDepth
 *               - septicVolume
 *               - septicConstructionType
 *               - paymentMethod
 *               - workDate
 *               - city
 *               - serviceId
 *               - executorId
 *               - address
 *             properties:
 *               objectType:
 *                 type: string
 *                 example: Жилой дом
 *               comment:
 *                 type: string
 *                 example: Нужно срочно приехать до обеда
 *               distanceToSeptic:
 *                 type: number
 *                 example: 15.5
 *               septicDepth:
 *                 type: number
 *                 example: 3.2
 *               septicVolume:
 *                 type: number
 *                 example: 5.0
 *               septicConstructionType:
 *                 type: string
 *                 example: Бетонные кольца
 *               paymentMethod:
 *                 type: string
 *                 example: Наличные
 *               workDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-08-01T09:00:00.000Z
 *               city:
 *                 type: string
 *                 example: Москва
 *               address:
 *                 type: string
 *                 example: Москва, ул. Пушкина, д. 10
 *               serviceId:
 *                 type: integer
 *                 example: 3
 *               executorId:
 *                 type: integer
 *                 example: 7
 *               price:
 *                 type: number
 *                 example: 25000
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
 *                   example: 42
 *                 status:
 *                   type: string
 *                   example: PENDING
 *                 workDate:
 *                   type: string
 *                   format: date-time
 *                 address:
 *                   type: string
 *                   example: Москва, ул. Пушкина, д. 10
 *                 executor:
 *                   type: object
 *                   description: Профиль исполнителя
 *                 customer:
 *                   type: object
 *                   description: Профиль заказчика
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /order/executor/{executorId}:
 *   get:
 *     summary: Получить заказы исполнителя (только админ)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: executorId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, REJECTED]
 *     responses:
 *       200:
 *         description: Список заказов
 *       403:
 *         description: Нет доступа
 */

/**
 * @swagger
 * /order/customer/{customerId}:
 *   get:
 *     summary: Получить заказы заказчика (только админ)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: customerId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, REJECTED]
 *     responses:
 *       200:
 *         description: Список заказов
 *       403:
 *         description: Нет доступа
 */

/**
 * @swagger
 * /order/my:
 *   get:
 *     summary: Получить свои заказы (для заказчика или исполнителя)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список заказов
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Получить заказ по ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Заказ найден
 *       404:
 *         description: Заказ не найден
 */

/**
 * @swagger
 * /order/{id}:
 *   patch:
 *     summary: Обновить заказ
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               objectType:
 *                 type: string
 *               comment:
 *                 type: string
 *               distanceToSeptic:
 *                 type: number
 *               septicDepth:
 *                 type: number
 *               septicVolume:
 *                 type: number
 *               septicConstructionType:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               workDate:
 *                 type: string
 *                 format: date-time
 *               addressId:
 *                 type: number
 *               serviceId:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Заказ обновлён
 *       403:
 *         description: Нет прав
 */

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Удалить заказ
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Заказ удалён
 *       404:
 *         description: Заказ не найден
 */

/**
 * @swagger
 * /order/{id}/accept:
 *   post:
 *     summary: Принять заказ (исполнитель)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Заказ принят
 *       403:
 *         description: Нет доступа
 */

/**
 * @swagger
 * /order/{id}/reject:
 *   post:
 *     summary: Отклонить заказ (исполнитель)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Заказ отклонён
 *       403:
 *         description: Нет доступа
 */
/**
 * @swagger
 * /order/{id}/complete:
 *   post:
 *     summary: Завершить заказ и прикрепить отчёт
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID заказа
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - total
 *             properties:
 *               total:
 *                 type: number
 *                 description: Общая сумма работ (например, за что выставлен счёт)
 *                 example: 15000
 *               reportFiles:
 *                 type: array
 *                 description: Файлы, подтверждающие выполнение работ
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Заказ успешно завершён и отчёт создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Заказ завершён и отчёт прикреплён
 *                 reportId:
 *                   type: integer
 *                   example: 101
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 42
 *                     status:
 *                       type: string
 *                       example: COMPLETED
 *       400:
 *         description: Ошибка завершения (например, неверный статус заказа)
 *       403:
 *         description: Нет прав завершать заказ
 *       404:
 *         description: Заказ не найден
 */
