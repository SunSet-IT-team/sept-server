/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Управление профилем администратора
 */

/**
 * @swagger
 * /admin/me:
 *   get:
 *     summary: Получить профиль текущего администратора
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профиль администратора успешно получен
 *       401:
 *         description: Неавторизован
 */

/**
 * @swagger
 * /admin/me:
 *   patch:
 *     summary: Обновить профиль текущего администратора
 *     tags: [Admin]
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
 *                 example: Иван
 *               lastName:
 *                 type: string
 *                 example: Иванов
 *               phone:
 *                 type: string
 *                 example: "+7 (999) 123-45-67"
 *     responses:
 *       200:
 *         description: Профиль администратора успешно обновлён
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Неавторизован
 */
