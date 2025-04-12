/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Работа с чатами
 */

/**
 * @swagger
 * /chat/order/{id}:
 *   get:
 *     summary: Получить чат по заказу (или создать если не существует)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID заказа
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Чат получен
 *       400:
 *         description: Ошибка запроса
 *       401:
 *         description: Неавторизован
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /chat/{id}/messages:
 *   get:
 *     summary: Получить сообщения чата с пагинацией
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID чата
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Количество сообщений на странице
 *     responses:
 *       200:
 *         description: Список сообщений
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Чат не найден
 */

/**
 * @swagger
 * /chat/order/{orderId}/support:
 *   post:
 *     summary: Получить или создать чат с поддержкой по заказу
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: ID заказа
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Чат с поддержкой получен или создан
 *       401:
 *         description: Неавторизован
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /chat/support:
 *   get:
 *     summary: Получить список всех чатов с поддержкой (только для администратора)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Количество на странице
 *     responses:
 *       200:
 *         description: Список чатов с поддержкой
 *       403:
 *         description: Нет прав
 */

/**
 * @swagger
 * /chat/admin/all:
 *   get:
 *     summary: Получить все чаты (только для администратора)
 *     tags: [Chat]
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
 *         description: Количество чатов на страницу
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [GENERAL, ORDER_CUSTOMER, ORDER_ADMIN, SUPPORT_CUSTOMER, SUPPORT_EXECUTOR]
 *         description: Тип чата
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: ID заказа
 *     responses:
 *       200:
 *         description: Список чатов
 *       403:
 *         description: Нет прав
 */
