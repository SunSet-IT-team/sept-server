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
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Алексей
 *               lastName:
 *                 type: string
 *                 example: Смирнов
 *               phone:
 *                 type: string
 *                 example: +79876543210
 *               updateAddresses:
 *                 type: string
 *                 format: json
 *                 description: JSON-массив адресов, которые нужно обновить
 *                 example: '[{"id":1,"value":"Москва, Ленина 1","isDefault":true}]'
 *               deleteAddressIds:
 *                 type: string
 *                 format: json
 *                 description: JSON-массив ID адресов для удаления
 *                 example: '[2, 3]'
 *               newAddresses:
 *                 type: string
 *                 format: json
 *                 description: JSON-массив новых адресов
 *                 example: '[{"value":"СПб, Невский 100","isDefault":false}]'
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Новое фото профиля
 *     responses:
 *       200:
 *         description: Профиль успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Профиль успешно обновлён
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     role:
 *                       type: string
 *                       example: CUSTOMER
 *                     customerProfile:
 *                       type: object
 *                       properties:
 *                         addresses:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               value:
 *                                 type: string
 *                               isDefault:
 *                                 type: boolean
 *                         priority:
 *                           type: integer
 *                     profilePhoto:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         url:
 *                           type: string
 *                         type:
 *                           type: string
 *                           example: PROFILE_PHOTO
 *       400:
 *         description: Ошибка валидации или данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь не найден или не является заказчиком
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
 *                             type: string
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
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
 *                                   type: string
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
 *           type: string
 *     responses:
 *       200:
 *         description: Профиль найден
 *       404:
 *         description: Не найден
 *
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
 *           type: string
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
 *     summary: Обновление профиля заказчика по ID
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Алексей
 *               lastName:
 *                 type: string
 *                 example: Смирнов
 *               phone:
 *                 type: string
 *                 example: +79876543210
 *               updateAddresses:
 *                 type: string
 *                 format: json
 *                 description: JSON-массив адресов, которые нужно обновить
 *                 example: '[{"id":1,"value":"Москва, Ленина 1","isDefault":true}]'
 *               deleteAddressIds:
 *                 type: string
 *                 format: json
 *                 description: JSON-массив ID адресов для удаления
 *                 example: '[2, 3]'
 *               newAddresses:
 *                 type: string
 *                 format: json
 *                 description: JSON-массив новых адресов
 *                 example: '[{"value":"СПб, Невский 100","isDefault":false}]'
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Новое фото профиля
 *     responses:
 *       200:
 *         description: Профиль успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Профиль успешно обновлён
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     role:
 *                       type: string
 *                       example: CUSTOMER
 *                     customerProfile:
 *                       type: object
 *                       properties:
 *                         addresses:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               value:
 *                                 type: string
 *                               isDefault:
 *                                 type: boolean
 *                         priority:
 *                           type: integer
 *                     profilePhoto:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         url:
 *                           type: string
 *                         type:
 *                           type: string
 *                           example: PROFILE_PHOTO
 *       400:
 *         description: Ошибка валидации или данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь не найден или не является заказчиком
 */
