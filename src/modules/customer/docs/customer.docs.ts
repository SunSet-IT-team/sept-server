/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Управление профилем заказчика
 */

/**
 * @swagger
 * /customer/me:
 *   get:
 *     summary: Получить свой профиль заказчика
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешно
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /customer/me:
 *   patch:
 *     summary: Обновить свой профиль заказчика
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Новый email пользователя
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *                 description: Новое имя пользователя
 *               lastName:
 *                 type: string
 *                 description: Новая фамилия пользователя
 *               phone:
 *                 type: string
 *                 description: Новый номер телефона
 *               updateAddresses:
 *                 type: array
 *                 description: Список существующих адресов для обновления
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     value:
 *                       type: string
 *                     isDefault:
 *                       type: boolean
 *               deleteAddressIds:
 *                 type: array
 *                 description: Список ID адресов для удаления
 *                 items:
 *                   type: integer
 *               newAddresses:
 *                 type: array
 *                 description: Список новых адресов для добавления
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     isDefault:
 *                       type: boolean
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Новый файл профиля (фото)
 *     responses:
 *       200:
 *         description: Профиль заказчика успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 profile:
 *                   type: object
 *                   description: DTO профиля (addresses, favorites и пр.)
 *                 ordersCount:
 *                   type: integer
 *                   description: Общее число заказов
 *                 reviewsReceivedCount:
 *                   type: integer
 *                   description: Количество полученных отзывов
 *                 reviewsGivenCount:
 *                   type: integer
 *                   description: Количество оставленных отзывов
 *       400:
 *         description: Ошибка валидации или обновлении профиля
 */

/**
 * @swagger
 * /customer/list:
 *   get:
 *     summary: Получить список заказчиков
 *     tags: [Customer]
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
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [firstName, lastName, email, status]
 *           example: firstName
 *         description: Поле сортировки
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *         description: Направление сортировки
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *           example: Иван
 *         description: Фильтр по имени
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *           example: Иванов
 *         description: Фильтр по фамилии
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           example: example@mail.com
 *         description: Фильтр по email
 *       - in: query
 *         name: status
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [UNVERIFIED, VERIFIED, DELETED, BANNED]
 *         style: form
 *         explode: true
 *         description: Фильтрация по статусу (один или несколько)
 *     responses:
 *       200:
 *         description: Список заказчиков
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
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: number
 *                               email:
 *                                 type: string
 *                               firstName:
 *                                 type: string
 *                               lastName:
 *                                 type: string
 *                               phone:
 *                                 type: string
 *                               status:
 *                                 type: string
 *                                 enum: [UNVERIFIED, VERIFIED, DELETED, BANNED]
 *                           addresses:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: number
 *                                 value:
 *                                   type: string
 *                                 city:
 *                                   type: string
 *                                 postalCode:
 *                                   type: string
 */

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Получить профиль заказчика по ID
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Профиль найден
 *       404:
 *         description: Не найден
 *
 *   patch:
 *     summary: Обновить профиль заказчика по ID (админ)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновлено
 *       403:
 *         description: Нет прав
 *
 *   delete:
 *     summary: Удалить заказчика по ID (админ)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Удалён
 *       404:
 *         description: Не найден
 *
 */

/**
 * @swagger
 * /customer/{id}:
 *   patch:
 *     summary: Обновить свой профиль заказчика
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Новый email пользователя
 *               firstName:
 *                 type: string
 *                 description: Новое имя пользователя
 *               lastName:
 *                 type: string
 *                 description: Новая фамилия пользователя
 *               phone:
 *                 type: string
 *                 description: Новый номер телефона
 *               updateAddresses:
 *                 type: array
 *                 description: Список существующих адресов для обновления
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     value:
 *                       type: string
 *                     isDefault:
 *                       type: boolean
 *               deleteAddressIds:
 *                 type: array
 *                 description: Список ID адресов для удаления
 *                 items:
 *                   type: integer
 *               newAddresses:
 *                 type: array
 *                 description: Список новых адресов для добавления
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     isDefault:
 *                       type: boolean
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Новый файл профиля (фото)
 *     responses:
 *       200:
 *         description: Профиль заказчика успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 profile:
 *                   type: object
 *                   description: DTO профиля (addresses, favorites и пр.)
 *                 ordersCount:
 *                   type: integer
 *                   description: Общее число заказов
 *                 reviewsReceivedCount:
 *                   type: integer
 *                   description: Количество полученных отзывов
 *                 reviewsGivenCount:
 *                   type: integer
 *                   description: Количество оставленных отзывов
 *       400:
 *         description: Ошибка валидации или обновлении профиля
 */

/**
 * @swagger
 * /customer/{id}/stats:
 *   get:
 *     summary: Получить статистику по заказам конкретного заказчика (только админ)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID заказчика
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Статистика по заказам заказчика
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: object
 *                   description: Общие показатели заявок
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 42
 *                     open:
 *                       type: integer
 *                       example: 10
 *                     closed:
 *                       type: integer
 *                       example: 30
 *                     cancelled:
 *                       type: integer
 *                       example: 2
 *                 ordersMonth:
 *                   type: object
 *                   description: Показатели заявок за текущий месяц
 *                   properties:
 *                     calls:
 *                       type: integer
 *                       example: 5
 *                     closed:
 *                       type: integer
 *                       example: 3
 *                     cancelled:
 *                       type: integer
 *                       example: 1
 *                 ordersTotal:
 *                   type: object
 *                   description: Показатели заявок за всё время (дублирует orders.total и т.п.)
 *                   properties:
 *                     calls:
 *                       type: integer
 *                       example: 42
 *                     closed:
 *                       type: integer
 *                       example: 30
 *                     cancelled:
 *                       type: integer
 *                       example: 2
 *       403:
 *         description: Нет доступа
 *       404:
 *         description: Заказчик не найден
 */

/**
 * @swagger
 * /customer/me/stats:
 *   get:
 *     summary: Получить статистику по заказам текущего заказчика
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Статистика по заказам текущего заказчика
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: object
 *                   description: Общие показатели заявок
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 10
 *                     open:
 *                       type: integer
 *                       example: 4
 *                     closed:
 *                       type: integer
 *                       example: 5
 *                     cancelled:
 *                       type: integer
 *                       example: 1
 *                 ordersMonth:
 *                   type: object
 *                   description: Показатели заявок за текущий месяц
 *                   properties:
 *                     calls:
 *                       type: integer
 *                       example: 2
 *                     closed:
 *                       type: integer
 *                       example: 1
 *                     cancelled:
 *                       type: integer
 *                       example: 0
 *                 ordersTotal:
 *                   type: object
 *                   description: Показатели заявок за всё время
 *                   properties:
 *                     calls:
 *                       type: integer
 *                       example: 10
 *                     closed:
 *                       type: integer
 *                       example: 5
 *                     cancelled:
 *                       type: integer
 *                       example: 1
 *       403:
 *         description: Нет доступа
 */
