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
 *     summary: Добавить или удалить исполнителя из избранного
 *     tags: [Favorite]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: executorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя‑исполнителя
 *     responses:
 *       200:
 *         description: Статус операции (toggle)
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
 *                       example: "Добавлено в избранное"
 *       403:
 *         description: Профиль заказчика не найден или нет прав
 *       404:
 *         description: Исполнитель не найден
 */

/**
 * @swagger
 * /favorite:
 *   get:
 *     summary: Список избранных исполнителей заказчика
 *     tags: [Favorite]
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
 *         description: Кол‑во элементов на странице
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Поле для сортировки (createdAt, city, rating, priority, firstName, lastName)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Направление сортировки
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Фильтр по городу исполнителя
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *         description: Минимальный рейтинг исполнителя
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Поиск по имени или фамилии исполнителя
 *     responses:
 *       200:
 *         description: Пагинированный список UserDto
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
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */
