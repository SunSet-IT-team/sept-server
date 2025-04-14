/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Авторизация, регистрация, верификация и восстановление
 */

/**
 * @swagger
 * /auth/login/customer:
 *   post:
 *     summary: Вход для заказчика
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: customer@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учётные данные
 */

/**
 * @swagger
 * /auth/login/executor:
 *   post:
 *     summary: Вход для исполнителя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: executor@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учётные данные
 */

/**
 * @swagger
 * /auth/login/admin:
 *   post:
 *     summary: Вход для администратора
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учётные данные
 */

/**
 * @swagger
 * /auth/register/customer:
 *   post:
 *     summary: Регистрация заказчика с загрузкой фото
 *     tags: [Auth]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [email, password, address]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               firstName:
 *                 type: string
 *                 example: Иван
 *               lastName:
 *                 type: string
 *                 example: Иванов
 *               phone:
 *                 type: string
 *                 example: "+7 (999) 123-45-67"
 *               address:
 *                 type: string
 *                 example: Москва, ул. Ленина, д.1
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *       400:
 *         description: Ошибка регистрации
 */

/**
 * @swagger
 * /auth/register/executor:
 *   post:
 *     summary: Регистрация исполнителя с файлами
 *     tags: [Auth]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [email, password, workFormat]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               workFormat:
 *                 type: string
 *                 enum: [INDIVIDUAL, LEGAL_ENTITY, SOLE_PROPRIETOR]
 *               experience:
 *                 type: string
 *               about:
 *                 type: string
 *               companyName:
 *                 type: string
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *               registrationDoc:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               licenseDoc:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               otherFiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Успешная регистрация исполнителя
 *       400:
 *         description: Ошибка регистрации
 */

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Подтверждение email по коду
 *     tags: [Auth]
 *     description: Проверяет код подтверждения для указанного email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: 1234-abcd
 *     responses:
 *       200:
 *         description: Email подтверждён успешно
 *       400:
 *         description: Неверный код или ошибка подтверждения
 */

/**
 * @swagger
 * /auth/verify/resend:
 *   post:
 *     summary: Повторная отправка кода верификации
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Код успешно отправлен
 *       400:
 *         description: Ошибка при отправке
 */

/**
 * @swagger
 * /auth/recovery/admin:
 *   post:
 *     summary: Сброс пароля администратора по коду
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code, newPassword]
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пароль успешно обновлён
 *       400:
 *         description: Ошибка восстановления
 */

/**
 * @swagger
 * /auth/password/change:
 *   post:
 *     summary: Смена пароля авторизованного пользователя
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: currentPass123
 *               newPassword:
 *                 type: string
 *                 example: newSecret456
 *     responses:
 *       200:
 *         description: Пароль успешно обновлён
 *       400:
 *         description: Ошибка валидации или старый пароль неверен
 *       401:
 *         description: Неавторизован
 */
