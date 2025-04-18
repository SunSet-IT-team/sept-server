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
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - phone
 *               - address
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *               firstName:
 *                 type: string
 *                 example: Иван
 *               lastName:
 *                 type: string
 *                 example: Иванов
 *               phone:
 *                 type: string
 *                 example: +79991234567
 *               address:
 *                 type: string
 *                 example: Москва, ул. Ленина, д.1
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Успешная регистрация заказчика
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Регистрация прошла успешно. Код подтверждения отправлен на email.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 42
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     firstName:
 *                       type: string
 *                       example: Иван
 *                     lastName:
 *                       type: string
 *                       example: Иванов
 *                     phone:
 *                       type: string
 *                       example: +79991234567
 *                     role:
 *                       type: string
 *                       example: CUSTOMER
 *                     status:
 *                       type: string
 *                       example: UNVERIFIED
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     customerProfile:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         addresses:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               value:
 *                                 type: string
 *                               isDefault:
 *                                 type: boolean
 *       400:
 *         description: Ошибка регистрации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь с таким email уже зарегистрирован
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
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - phone
 *               - companyName
 *               - workFormat
 *               - experience
 *               - city
 *               - profilePhoto
 *               - registrationDoc
 *               - licenseDoc
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: example@mail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: qwerty123
 *               phone:
 *                 type: string
 *                 example: +79001234567
 *               workFormat:
 *                 type: string
 *                 enum: [INDIVIDUAL, LEGAL_ENTITY, SOLE_PROPRIETOR]
 *               experience:
 *                 type: string
 *                 example: "5"
 *               city:
 *                 type: string
 *                 example: Москва
 *               about:
 *                 type: string
 *                 example: "Работаю по всему региону. Отзывы положительные."
 *               companyName:
 *                 type: string
 *                 example: ООО 'Септик-Мастер'
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *               registrationDoc:
 *                 type: string
 *                 format: binary
 *               licenseDoc:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Успешная регистрация исполнителя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Регистрация прошла успешно. Код подтверждения отправлен на email.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     email:
 *                       type: string
 *                       example: example@mail.com
 *                     firstName:
 *                       type: string
 *                       example: Иван
 *                     lastName:
 *                       type: string
 *                       example: Иванов
 *                     phone:
 *                       type: string
 *                       example: +79001234567
 *                     role:
 *                       type: string
 *                       enum: [ADMIN, CUSTOMER, EXECUTOR]
 *                       example: EXECUTOR
 *                     status:
 *                       type: string
 *                       enum: [UNVERIFIED, VERIFIED, DELETED, BANNED]
 *                       example: UNVERIFIED
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-04-15T12:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-04-15T12:00:00.000Z
 *                     executorProfile:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 3
 *                         workFormat:
 *                           type: string
 *                           enum: [INDIVIDUAL, LEGAL_ENTITY, SOLE_PROPRIETOR]
 *                           example: INDIVIDUAL
 *                         experience:
 *                           type: integer
 *                           example: 5
 *                         about:
 *                           type: string
 *                           example: Опыт более 5 лет
 *                         companyName:
 *                           type: string
 *                           example: ИП Иванов
 *                         city:
 *                           type: string
 *                           example: Москва
 *                         rating:
 *                           type: number
 *                           format: float
 *                           example: 0.0
 *                         completedOrders:
 *                           type: integer
 *                           example: 0
 *       400:
 *         description: Ошибка валидации или регистрации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь с таким email уже зарегистрирован
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
/**
 * @swagger
 * /auth/password/forgot:
 *   post:
 *     summary: Отправить код восстановления пароля на email
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
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Код успешно отправлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Код выслан на почту
 *       400:
 *         description: Неверный запрос или пользователь не найден
 */

/**
 * @swagger
 * /auth/password/reset:
 *   post:
 *     summary: Сбросить пароль по коду
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
 *                 format: email
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "newStrongPass1"
 *     responses:
 *       200:
 *         description: Пароль успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пароль успешно обновлён
 *       400:
 *         description: Неверный код, email или срок действия истёк
 */
