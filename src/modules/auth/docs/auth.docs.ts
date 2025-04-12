/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Авторизация, регистрация, верификация и восстановление

 * /auth/login/customer:
 *   post:
 *     summary: Вход для заказчика
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учётные данные

 * /auth/login/executor:
 *   post:
 *     summary: Вход для исполнителя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учётные данные

 * /auth/login/admin:
 *   post:
 *     summary: Вход для администратора
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учётные данные

 * /auth/register/customer:
 *   post:
 *     summary: Регистрация заказчика
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterCustomerDTO'
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *       400:
 *         description: Ошибка регистрации

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
 *             required:
 *               - email
 *               - password
 *               - workFormat
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

 * /auth/verify:
 *   post:
 *     summary: Подтверждение email по коду
 *     tags: [Auth]
 *     description: Проверяет код подтверждения для указанного email. Код может быть использован только владельцем email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: 8a2fcb94-8efb-45e6-9ccf-5cf79f06fe4e
 *       400:
 *         description: Неверный код или ошибка подтверждения
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'

 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string

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
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Код успешно отправлен
 *       400:
 *         description: Ошибка при отправке

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
 *             required:
 *               - email
 *               - code
 *               - newPassword
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
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     RegisterCustomerDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - address
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 */
