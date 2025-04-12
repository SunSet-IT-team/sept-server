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
 *         description: Профиль обновлён
 *       400:
 *         description: Ошибка обновления
 */

/**
 * @swagger
 * /customer/list:
 *   get:
 *     summary: Получить список заказчиков (для админа)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Список заказчиков
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
 *           type: string
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
 *           type: string
 *     responses:
 *       200:
 *         description: Удалён
 *       404:
 *         description: Не найден
 */

/**
 * @swagger
 * /customer/address:
 *   post:
 *     summary: Создать новый адрес заказчика
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string
 *                 description: Полный адрес
 *               city:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               coordinates:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *                 description: Сделать адрес основным
 *     responses:
 *       201:
 *         description: Адрес создан
 *       400:
 *         description: Ошибка валидации
 */
