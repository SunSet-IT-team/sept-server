/**
 * @swagger
 * tags:
 *   name: Executor
 *   description: Управление исполнителями
 */

/**
 * @swagger
 * /executor:
 *   get:
 *     summary: Получить список исполнителей с пагинацией и фильтрацией
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Номер страницы
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Количество элементов на странице
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         description: Поле для сортировки
 *         schema:
 *           type: string
 *           enum: [priority, rating, experience, completedOrders, companyName, city, createdAt]
 *           default: rating
 *       - name: order
 *         in: query
 *         description: Направление сортировки
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *       - name: workFormat
 *         in: query
 *         description: Формат работы
 *         schema:
 *           type: string
 *           enum: [INDIVIDUAL, LEGAL_ENTITY, SOLE_PROPRIETOR]
 *       - name: companyName
 *         in: query
 *         description: Название компании (частичное совпадение)
 *         schema:
 *           type: string
 *       - name: minRating
 *         in: query
 *         description: Минимальный рейтинг
 *         schema:
 *           type: number
 *       - name: city
 *         in: query
 *         description: Город (частичное совпадение)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешно получен список исполнителей
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /executor/me:
 *   get:
 *     summary: Получить свой профиль исполнителя
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профиль успешно получен
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /executor/me:
 *   patch:
 *     summary: Обновить свой профиль исполнителя
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               workFormat:
 *                 type: string
 *                 enum: [INDIVIDUAL, LEGAL_ENTITY, SOLE_PROPRIETOR]
 *               experience:
 *                 type: integer
 *               about:
 *                 type: string
 *               companyName:
 *                 type: string
 *               description:
 *                 type: string
 *               fileIdsToDelete:
 *                 type: array
 *                 items:
 *                   type: number
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *               registrationDoc:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               licenseDoc:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Профиль обновлен
 *       400:
 *         description: Ошибка валидации
 */

/**
 * @swagger
 * /executor/{id}:
 *   get:
 *     summary: Получить профиль исполнителя по ID
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: ID исполнителя
 *     responses:
 *       200:
 *         description: Профиль исполнителя получен
 *       404:
 *         description: Исполнитель не найден
 */

/**
 * @swagger
 * /executor/{id}:
 *   patch:
 *     summary: Обновить профиль исполнителя по ID (только для администраторов)
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: ID исполнителя
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               workFormat:
 *                 type: string
 *                 enum: [INDIVIDUAL, LEGAL_ENTITY, SOLE_PROPRIETOR]
 *               experience:
 *                 type: integer
 *               about:
 *                 type: string
 *               companyName:
 *                 type: string
 *               description:
 *                 type: string
 *               fileIdsToDelete:
 *                 type: array
 *                 items:
 *                   type: number
 *                   format: uuid
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *               registrationDoc:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               licenseDoc:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Профиль обновлён
 *       403:
 *         description: Нет прав
 *       400:
 *         description: Ошибка валидации
 */

/**
 * @swagger
 * /executor/{id}:
 *   delete:
 *     summary: Удалить профиль исполнителя по ID (только для администраторов)
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: id исполнителя
 *     responses:
 *       200:
 *         description: Исполнитель помечен удалённым
 *       403:
 *         description: Нет прав
 *       404:
 *         description: Исполнитель не найден
 */

/**
 * @swagger
 * /executor/{id}/stats:
 *   get:
 *     summary: Получить статистику указанного исполнителя (только админ)
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID исполнителя
 *         required: true
 *         schema:
 *           type: integer
 *           example: 42
 *     responses:
 *       200:
 *         description: Статистика исполнителя
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
 *                     income:
 *                       type: object
 *                       properties:
 *                         month:
 *                           type: number
 *                           description: Доход за текущий месяц
 *                           example: 12500
 *                         total:
 *                           type: number
 *                           description: Доход за весь период
 *                           example: 65500
 *                     statsMonth:
 *                       type: object
 *                       description: Статистика по заказам за последний месяц
 *                       properties:
 *                         calls:
 *                           type: integer
 *                           description: Всего вызовов
 *                           example: 38
 *                         closed:
 *                           type: integer
 *                           description: Закрыто
 *                           example: 28
 *                         rejected:
 *                           type: integer
 *                           description: Отказано
 *                           example: 10
 *                     statsTotal:
 *                       type: object
 *                       description: Общая статистика по заказам
 *                       properties:
 *                         calls:
 *                           type: integer
 *                           example: 380
 *                         closed:
 *                           type: integer
 *                           example: 250
 *                         rejected:
 *                           type: integer
 *                           example: 130
 *       400:
 *         description: Некорректный запрос (например, неверный ID)
 *       403:
 *         description: Нет доступа
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /executor/me/stats:
 *   get:
 *     summary: Получить свою статистику (только исполнитель)
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ваша статистика
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ExecutorStats'
 *       403:
 *         description: Нет доступа
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExecutorStats:
 *       type: object
 *       properties:
 *         income:
 *           type: object
 *           properties:
 *             month:
 *               type: number
 *               description: Доход за текущий месяц
 *               example: 12500
 *             total:
 *               type: number
 *               description: Доход за весь период
 *               example: 65500
 *         statsMonth:
 *           type: object
 *           properties:
 *             calls:
 *               type: integer
 *               description: Всего вызовов за месяц
 *               example: 38
 *             closed:
 *               type: integer
 *               description: Закрыто за месяц
 *               example: 28
 *             rejected:
 *               type: integer
 *               description: Отказано за месяц
 *               example: 10
 *         statsTotal:
 *           type: object
 *           properties:
 *             calls:
 *               type: integer
 *               description: Всего вызовов за весь период
 *               example: 380
 *             closed:
 *               type: integer
 *               description: Закрыто за весь период
 *               example: 250
 *             rejected:
 *               type: integer
 *               description: Отказано за весь период
 *               example: 130
 */
