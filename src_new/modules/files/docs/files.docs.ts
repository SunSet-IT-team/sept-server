/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Защищённый доступ к файлам

 * /files/{filename}:
 *   get:
 *     summary: Получить файл (защищённо)
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Название файла (сгенерированное uuid-название, включая расширение)
 *         schema:
 *           type: string
 *           example: 7f3ab238-86f1-4db9-b5bc-1d7a126caa19.png
 *     responses:
 *       200:
 *         description: Файл успешно найден и отдан
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       403:
 *         description: Нет доступа к файлу (не владелец и не админ)
 *       404:
 *         description: Файл не найден
 *       401:
 *         description: Неавторизованный доступ
 */
