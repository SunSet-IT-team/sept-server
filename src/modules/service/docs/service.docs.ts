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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Откачка септика"
 *               priority:
 *                 type: string
 *                 example: "100"
 *               servicePreview:
 *                 type: string
 *                 format: binary
 *                 description: Превью-файл (картинка)
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
 *         description: Ошибка валидации
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
 *           type: integer
 *         description: ID услуги
 *     responses:
 *       200:
 *         description: Услуга успешно получена
 *       404:
 *         description: Услуга не найдена
 */

/**
 * @swagger
 * /service/{id}:
 *   patch:
 *     summary: Обновить услугу
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID услуги
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Откачка септика (экстренная)"
 *               priority:
 *                 type: string
 *                 example: "50"
 *               servicePreview:
 *                 type: string
 *                 format: binary
 *                 description: Новый превью-файл
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
 *     summary: Удалить услугу
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID услуги
 *     responses:
 *       200:
 *         description: Услуга успешно удалена
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Услуга не найдена
 */
