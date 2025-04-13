/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Административная статистика по системе

 * /admin/stats:
 *   get:
 *     summary: Получить сводную статистику
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ со сводной статистикой
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
 *                     orders:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 386
 *                         closed:
 *                           type: integer
 *                           example: 350
 *                         open:
 *                           type: integer
 *                           example: 36
 *                         closedPercent:
 *                           type: string
 *                           example: "75"
 *                         openPercent:
 *                           type: string
 *                           example: "25"
 *                     executors:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 570
 *                         newThisMonth:
 *                           type: integer
 *                           example: 13
 *                         byCity:
 *                           type: object
 *                           additionalProperties:
 *                             type: integer
 *                           example:
 *                             Москва: 257
 *                             Самара: 10
 *                             Волгоград: 96
 *                         top:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: Иванов Иван
 *                               closedCount:
 *                                 type: integer
 *                                 example: 23
 *                     closedOrdersTotalSum:
 *                       type: number
 *                       example: 19356.0
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет доступа (нужна роль ADMIN)
 *       400:
 *         description: Ошибка запроса
 */
