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
 *           type: number
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
 *                       type: number
 *                     text:
 *                       type: string
 *                     rating:
 *                       type: integer
 *                     authorId:
 *                       type: number
 *                     targetId:
 *                       type: number
 *                     orderId:
 *                       type: number
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
 * /review:
 *   get:
 *     summary: Получить список отзывов
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           description: Поле для сортировки (например, createdAt, rating)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *       - in: query
 *         name: senderId
 *         schema:
 *           type: integer
 *         description: Фильтр по ID автора отзыва
 *       - in: query
 *         name: targetId
 *         schema:
 *           type: integer
 *         description: Фильтр по ID получателя отзыва
 *     responses:
 *       200:
 *         description: Пагинированный список отзывов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
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
 *                             type: integer
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
 *                             type: integer
 *                           title:
 *                             type: string
 *                           status:
 *                             type: string
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
 *           type: number
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
 *                       type: number
 *                     text:
 *                       type: string
 *                     rating:
 *                       type: integer
 *                     authorId:
 *                       type: number
 *                     targetId:
 *                       type: number
 *                     orderId:
 *                       type: number
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
 *           type: number
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
