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
 *           type: number
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
 *           type: number
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
 * /chat/support:
 *   post:
 *     summary: Получить или создать чат с поддержкой
 *     description: Создаёт или возвращает чат с поддержкой. Может быть привязан к заказу (если указан orderId).
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: ID заказа для привязки чата (необязательно)
 *                 example: 123
 *     responses:
 *       200:
 *         description: Чат с поддержкой получен или создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 type:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           email:
 *                             type: string
 *                           role:
 *                             type: string
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
