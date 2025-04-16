/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Управление услугами
 */

/**
 * @swagger
 * /service:
 *   post:
 *     summary: Создать новую услугу
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Откачка септика"
 *               priority:
 *                 type: integer
 *                 example: 100
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Услуга успешно создана
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Получить услугу по ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID услуги
 *     responses:
 *       200:
 *         description: Услуга успешно получена
 *       404:
 *         description: Услуга не найдена
 */

/**
 * @swagger
 * /service:
 *   get:
 *     summary: Получить список услуг с пагинацией и сортировкой
 *     tags: [Service]
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
 *         description: Количество элементов на странице
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, priority, createdAt]
 *           default: priority
 *         description: Поле для сортировки
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Направление сортировки
 *     responses:
 *       200:
 *         description: Список услуг успешно получен
 *       400:
 *         description: Ошибка валидации или некорректный запрос
 */

/**
 * @swagger
 * /service/{id}:
 *   patch:
 *     summary: Обновить услугу по ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID услуги
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Откачка септика (экстренная)"
 *               priority:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Услуга успешно обновлена
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Услуга не найдена
 */

/**
 * @swagger
 * /service/{id}:
 *   delete:
 *     summary: Удалить услугу по ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID услуги
 *     responses:
 *       200:
 *         description: Услуга успешно удалена
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Услуга не найдена
 */
