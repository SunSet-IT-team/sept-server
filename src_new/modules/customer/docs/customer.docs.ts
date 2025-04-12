/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Управление заказчиками
 */

/**
 * @swagger
 * /customer/list:
 *   get:
 *     summary: Получить список заказчиков с пагинацией и фильтрацией
 *     tags: [Customer]
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
 *           enum: [firstName, lastName, createdAt]
 *           default: createdAt
 *       - name: order
 *         in: query
 *         description: Направление сортировки
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *       - name: firstName
 *         in: query
 *         description: Имя заказчика (частичное совпадение)
 *         schema:
 *           type: string
 *       - name: lastName
 *         in: query
 *         description: Фамилия заказчика (частичное совпадение)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список заказчиков успешно получен
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /customer/me:
 *   get:
 *     summary: Получить собственный профиль заказчика
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профиль заказчика успешно получен
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /customer/me:
 *   patch:
 *     summary: Обновить собственный профиль заказчика
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
 *         description: Ошибка валидации
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
 *           format: uuid
 *         description: UUID заказчика
 *     responses:
 *       200:
 *         description: Профиль заказчика успешно получен
 *       404:
 *         description: Заказчик не найден
 */

/**
 * @swagger
 * /customer/{id}:
 *   patch:
 *     summary: Обновить профиль заказчика по ID (только для администратора)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID заказчика
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
 *         description: Профиль успешно обновлён
 *       403:
 *         description: Нет прав
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Заказчик не найден
 */

/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     summary: Удалить профиль заказчика по ID (только для администратора)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID заказчика
 *     responses:
 *       200:
 *         description: Профиль заказчика помечен как удалённый
 *       403:
 *         description: Нет прав
 *       404:
 *         description: Заказчик не найден
 */
