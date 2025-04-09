import {Router} from 'express';
import {validateDto} from '../../middleware/validate';
import * as AdminController from './admin.controller';
import {LoginAdminDTO} from './dto/loginAdmin.dto';
import {RecoveryAdminDTO} from './dto/recoveryAdmin.dto';

export const adminRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Авторизация и восстановление пароля для админа
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Авторизация админа
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: adminSecret123
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Неверные учетные данные
 */
adminRouter.post('/login', validateDto(LoginAdminDTO), AdminController.login);

/**
 * @swagger
 * /admin/recovery:
 *   post:
 *     summary: Восстановление пароля администратора
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               code:
 *                 type: string
 *                 example: C67OD36E
 *               newPassword:
 *                 type: string
 *                 example: newAdminPass123
 *               confirmPassword:
 *                 type: string
 *                 example: newAdminPass123
 *     responses:
 *       200:
 *         description: Пароль успешно восстановлен
 *       400:
 *         description: Ошибка при восстановлении пароля
 */
adminRouter.post(
    '/recovery',
    validateDto(RecoveryAdminDTO),
    AdminController.recovery
);
