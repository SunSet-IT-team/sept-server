import {Router} from 'express';
import * as CustomerController from './controllers';
import {validateDto} from '../../middleware/validate';
import {RegisterCustomerDTO} from './dto/registerCustomer.dto';
import {LoginDTO} from '../auth/dto/login.dto';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {UpdateCustomerDTO} from './dto/updateCustomer.dto';
import {verification} from '../auth/controllers/verifyCode.controller';
import {register} from './customer.controller';
import {login} from '../auth/controllers/login.controller';

export const customerRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Авторизация и регистрация заказчиков
 */

/**
 * @swagger
 * /customer/register:
 *   post:
 *     summary: Регистрация заказчика
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - address
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecret123
 *               address:
 *                 type: string
 *                 example: ул. Ленина, д. 1
 *     responses:
 *       201:
 *         description: Успешная регистрация, возвращается JWT токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
customerRouter.post('/register', validateDto(RegisterCustomerDTO), register);

/**
 * @swagger
 * /customer/login:
 *   post:
 *     summary: Логин заказчика
 *     tags: [Customer]
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecret123
 *     responses:
 *       200:
 *         description: Успешный вход, возвращается JWT токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
customerRouter.post('/login', validateDto(LoginDTO), login);

/**
 * @swagger
 * /customer/me:
 *   patch:
 *     summary: Обновление профиля заказчика
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecret123
 *     responses:
 *       200:
 *         description: Профиль обновлён
 */
customerRouter.patch(
    '/me',
    authMiddleware,
    roleMiddleware(['CUSTOMER']),
    validateDto(UpdateCustomerDTO),
    CustomerController.updateMe
);

/**
 * @swagger
 * /customer/verify:
 *   post:
 *     summary: Верификация email через код
 *     tags: [Customer]
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
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email успешно подтверждён
 */
customerRouter.post('/verify', verification);

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Получить список всех заказчиков (только для админа)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список заказчиков
 */
customerRouter.get(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    CustomerController.listCustomers
);

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Получить заказчика по ID (только для админа)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о заказчике
 */
customerRouter.get(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    CustomerController.getCustomer
);

/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     summary: Удалить заказчика по ID (только для админа)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Заказчик удалён
 */
customerRouter.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    CustomerController.removeCustomer
);

/**
 * @swagger
 * /customer/{id}:
 *   patch:
 *     summary: Обновить заказчика по ID (только для админа)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - address
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecret123
 *               address:
 *                 type: string
 *                 example: ул. Ленина, д. 1
 *     responses:
 *       200:
 *         description: Заказчик обновлён
 */
customerRouter.patch(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    CustomerController.updateCustomer
);
