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
 *               - addressId
 *               - serviceId
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
 *                 type: string
 *               serviceId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Заказ создан
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /order/executor/{executorId}:
 *   get:
 *     summary: Получить заказы исполнителя (только администратор)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: executorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество записей на страницу
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, REJECTED]
 *         description: Статус заказа
 *     responses:
 *       200:
 *         description: Список заказов исполнителя
 *       403:
 *         description: Нет доступа
 */

/**
 * @swagger
 * /order/customer/{customerId}:
 *   get:
 *     summary: Получить заказы заказчика (только администратор)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: customerId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество записей на страницу
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, REJECTED]
 *         description: Статус заказа
 *     responses:
 *       200:
 *         description: Список заказов заказчика
 *       403:
 *         description: Нет доступа
 */

/**
 * @swagger
 * /order/my:
 *   get:
 *     summary: Получить свои заказы (для заказчика и исполнителя)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество записей на страницу
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Статус заказа
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
 *           type: string
 *     responses:
 *       200:
 *         description: Детали заказа
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
 *           type: string
 *     requestBody:
 *       required: true
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
 *                 type: string
 *               serviceId:
 *                 type: string
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
 *           type: string
 *     responses:
 *       200:
 *         description: Заказ удалён
 *       404:
 *         description: Не найден
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
 *           type: string
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
 *           type: string
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
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Описание отчёта
 *               reportFiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Заказ завершён
 *       400:
 *         description: Ошибка завершения
 */
