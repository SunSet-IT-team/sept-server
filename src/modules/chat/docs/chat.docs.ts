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
 *     summary: Получить чат по заказу (или создать, если не существует)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заказа
 *     responses:
 *       200:
 *         description: Чат получен или создан
 *       400:
 *         description: Ошибка запроса
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Заказ не найден
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
 *         required: true
 *         description: ID чата
 *         schema:
 *           type: integer
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
 *     summary: Создать чат с поддержкой
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - theme
 *             properties:
 *               theme:
 *                 type: string
 *                 description: Тема обращения в поддержку
 *                 example: "Не могу прикрепить отчёт"
 *     responses:
 *       201:
 *         description: Чат с поддержкой создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 type:
 *                   type: string
 *                   example: SUPPORT_CUSTOMER
 *                 theme:
 *                   type: string
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
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           email:
 *                             type: string
 *                           role:
 *                             type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       text:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       sender:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           role:
 *                             type: string
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /chat/support/admin:
 *   get:
 *     summary: Получить все чаты с поддержкой (только для администратора)
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
 *         description: Количество чатов на странице
 *     responses:
 *       200:
 *         description: Список чатов с поддержкой
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 42
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     pages:
 *                       type: integer
 *                       example: 5
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 12
 *                           type:
 *                             type: string
 *                             example: SUPPORT_CUSTOMER
 *                           theme:
 *                             type: string
 *                             example: "Не могу прикрепить файл"
 *                           orderId:
 *                             type: integer
 *                             nullable: true
 *                             example: 345
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-04-19T12:34:56.000Z"
 *                           participants:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 23
 *                                 user:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                       example: 44
 *                                     email:
 *                                       type: string
 *                                       example: "client@mail.ru"
 *                                     role:
 *                                       type: string
 *                                       example: "CUSTOMER"
 *       401:
 *         description: Неавторизован
 *       403:
 *         description: Доступ запрещён
 */

/**
 * @swagger
 * /chat/support:
 *   get:
 *     summary: Получить чат с поддержкой (если существует)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Чат с поддержкой найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 type:
 *                   type: string
 *                   example: SUPPORT_CUSTOMER
 *                 theme:
 *                   type: string
 *                   nullable: true
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
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           email:
 *                             type: string
 *                           role:
 *                             type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       text:
 *                         type: string
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       isReaded:
 *                         type: boolean
 *                         nullable: true
 *                       sender:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           email:
 *                             type: string
 *                           role:
 *                             type: string
 *                       files:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             filename:
 *                               type: string
 *                             url:
 *                               type: string
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Чат с поддержкой не найден
 */
