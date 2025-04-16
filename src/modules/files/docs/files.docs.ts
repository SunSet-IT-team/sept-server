/**
 * @swagger
 * tags:
 *   - name: File
 *     description: Загрузка и доступ к файлам
 */

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Загрузка одного или нескольких файлов
 *     tags: [File]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Файлы успешно загружены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       url:
 *                         type: string
 *                       filename:
 *                         type: string
 *       400:
 *         description: Ошибка при загрузке
 *       401:
 *         description: Неавторизованный доступ
 */

/**
 * @swagger
 * /api/files/{filename}:
 *   get:
 *     summary: Получить защищённый файл по названию
 *     tags: [File]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Название файла (с ID и расширением)
 *         schema:
 *           type: number
 *           example: "a1b2c3d4-5678-90ab-cdef-1234567890ab.jpg"
 *     responses:
 *       200:
 *         description: Файл успешно отдан
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Неавторизованный доступ
 *       403:
 *         description: Доступ запрещён (не владелец и не админ)
 *       404:
 *         description: Файл не найден
 */
