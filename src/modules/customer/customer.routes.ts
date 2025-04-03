import {Router} from 'express';
import * as CustomerController from './customer.controller';
import {validateDto} from '../../middleware/validate';
import {RegisterCustomerDTO} from './dto/registerCustomer.dto';
import {LoginDTO} from '../auth/dto/login.dto';

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
