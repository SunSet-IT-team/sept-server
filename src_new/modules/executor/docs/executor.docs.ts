/**
 * @swagger
 * /executor/me:
 *   get:
 *     summary: Получить профиль текущего исполнителя
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профиль успешно получен
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
 *       400:
 *         description: Ошибка получения профиля
 */
