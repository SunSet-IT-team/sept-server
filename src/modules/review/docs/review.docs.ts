/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Управление отзывами
 */

/**
 * @swagger
 * /review/{orderId}:
 *   post:
 *     summary: Создать отзыв на исполнителя по заказу
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID заказа, по которому оставляется отзыв
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - rating
 *             properties:
 *               text:
 *                 type: string
 *                 example: Отличная работа, все быстро и качественно
 *               rating:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Отзыв успешно создан
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
 *                     id:
 *                       type: string
 *                     text:
 *                       type: string
 *                     rating:
 *                       type: integer
 *                     authorId:
 *                       type: string
 *                     targetId:
 *                       type: string
 *                     orderId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Ошибка (например, заказ не найден, нет исполнителя, вы не владелец заказа)
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /review/{targetId}:
 *   get:
 *     summary: Получить все отзывы о пользователе
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: targetId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя (обычно исполнителя), на которого оставлены отзывы
 *     responses:
 *       200:
 *         description: Список отзывов о пользователе
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       text:
 *                         type: string
 *                       rating:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       author:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           firstName:
 *                             type: string
 *                           lastName:
 *                             type: string
 *                           role:
 *                             type: string
 *                       order:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           status:
 *                             type: string
 *       400:
 *         description: Ошибка
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /review/{reviewId}:
 *   patch:
 *     summary: Обновить отзыв
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID отзыва, который нужно изменить
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: Немного улучшили сервис
 *               rating:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Отзыв успешно обновлён
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
 *                     id:
 *                       type: string
 *                     text:
 *                       type: string
 *                     rating:
 *                       type: integer
 *                     authorId:
 *                       type: string
 *                     targetId:
 *                       type: string
 *                     orderId:
 *                       type: string
 *       400:
 *         description: Ошибка (например, нет прав или отзыв не найден)
 *       401:
 *         description: Неавторизован
 *
 *   delete:
 *     summary: Удалить отзыв
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID отзыва, который нужно удалить
 *     responses:
 *       200:
 *         description: Отзыв удалён
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
 *                     message:
 *                       type: string
 *                       example: 'Отзыв удалён'
 *       400:
 *         description: Ошибка (например, нет прав или отзыв не найден)
 *       401:
 *         description: Неавторизован
 */
