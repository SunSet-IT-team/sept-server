import {Router} from 'express';
import * as CustomerController from './customer.controller';
import {validateDto} from '../../middleware/validate';
import {RegisterCustomerDTO} from './dto/registerCustomer.dto';
import {LoginDTO} from '../auth/dto/login.dto';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {UpdateCustomerDTO} from './dto/updateCustomer.dto';
import {verification} from '../auth/controllers/verifyCode.controller';

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

customerRouter.post(
    '/register',
    validateDto(RegisterCustomerDTO),
    CustomerController.register
);

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

customerRouter.post('/login', validateDto(LoginDTO), CustomerController.login);

/**
 * @swagger
 * /customer/me:
 *   patch:
 *     summary: Обновить профиль заказчика
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerDTO'
 *     responses:
 *       200:
 *         description: Профиль обновлён
 */
customerRouter.patch(
    '/me',
    authMiddleware,
    roleMiddleware(['CUSTOMER']),
    validateDto(UpdateCustomerDTO),
    CustomerController.updateProfile
);

customerRouter.post('/verify', verification);
