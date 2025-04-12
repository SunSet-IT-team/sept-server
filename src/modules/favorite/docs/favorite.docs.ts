/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: Избранные исполнители
 */

/**
 * @swagger
 * /favorite/{executorId}:
 *   post:
 *     summary: Добавить или удалить исполнителя из избранного (toggle)
 *     tags: [Favorite]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: executorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID профиля исполнителя
 *     responses:
 *       200:
 *         description: Статус действия (добавлен/удалён)
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
 *                       example: Добавлено в избранное
 *       400:
 *         description: Ошибка (например, профиль заказчика не найден)
 */

/**
 * @swagger
 * /favorite:
 *   get:
 *     summary: Получить список избранных исполнителей заказчика
 *     tags: [Favorite]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Кол-во элементов на странице
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *           example: АкваСервис
 *         description: Поиск по названию компании
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           example: Москва
 *         description: Поиск по городу
 *     responses:
 *       200:
 *         description: Список избранных исполнителей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           executor:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               companyName:
 *                                 type: string
 *                               city:
 *                                 type: string
 *                               rating:
 *                                 type: number
 *                               completedOrders:
 *                                 type: integer
 *                               user:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                   email:
 *                                     type: string
 *                                   firstName:
 *                                     type: string
 *                                   lastName:
 *                                     type: string
 */
