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
 *     summary: Получить / создать чат с поддержкой
 *     description: |
 *       Возвращает существующий чат *ORDER_ADMIN* с участием пользователя или создаёт новый.<br/>
 *       Если передан **orderId**, чат будет (или останется) привязан к заказу.<br/>
 *       Опционально можно задать/изменить **theme** – произвольную тему обращения.
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID заказа, к которому следует привязать чат
 *         example: 123
 *       - in: query
 *         name: theme
 *         schema:
 *           type: string
 *         required: true
 *         description: Тема обращения в поддержку
 *         example: "Не могу прикрепить отчёт"
 *
 *     responses:
 *       200:
 *         description: Чат получен или создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 17
 *                 orderId:
 *                   type: integer
 *                   nullable: true
 *                   example: 123
 *                 type:
 *                   type: string
 *                   example: ORDER_ADMIN
 *                 theme:
 *                   type: string
 *                   nullable: true
 *                   example: "Не могу прикрепить отчёт"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 42
 *                           email:
 *                             type: string
 *                             example: user@example.com
 *                           role:
 *                             type: string
 *                             example: CUSTOMER
 *       401:
 *         description: Неавторизован
 *       403:
 *         description: Доступ запрещён
 *       404:
 *         description: Заказ не найден
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
