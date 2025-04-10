import {Router} from 'express';
import * as ExecutorController from './executor.controller';
import {validateDto} from '../../middleware/validate';
import {RegisterExecutorDTO} from './dto/registerExecutor.dto';
import {LoginDTO} from '../auth/dto/login.dto';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {UpdateExecutorDTO} from './dto/updateExecutor.dto';

export const routerExecutor = Router();

/**
 * @swagger
 * /executor/register:
 *   post:
 *     summary: Регистрация исполнителя
 *     tags: [Executor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - city
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: executor@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: superSecret123
 *               city:
 *                 type: string
 *                 example: Санкт-Петербург
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
routerExecutor.post(
    '/register',
    validateDto(RegisterExecutorDTO),
    ExecutorController.register
);

/**
 * @swagger
 * /executor/login:
 *   post:
 *     summary: Логин исполнителя
 *     tags: [Executor]
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
 *                 example: executor@example.com
 *               password:
 *                 type: string
 *                 example: superSecret123
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
routerExecutor.post('/login', validateDto(LoginDTO), ExecutorController.login);

/**
 * @swagger
 * /executor/me:
 *   patch:
 *     summary: Обновить профиль исполнителя
 *     tags: [Executor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *             properties:
 *               city:
 *                 type: string
 *                 example: Санкт-Петербург
 *     responses:
 *       200:
 *         description: Профиль обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 city:
 *                   type: string
 *       400:
 *         description: Ошибка валидации или прав доступа
 */
routerExecutor.patch(
    '/me',
    authMiddleware,
    roleMiddleware(['EXECUTOR']),
    validateDto(UpdateExecutorDTO),
    ExecutorController.updateProfile
);

/**
 * @swagger
 * /executor/rating/{executorId}:
 *   get:
 *     summary: Получить рейтинг исполнителя
 *     description: Возвращает средний рейтинг и количество отзывов для указанного исполнителя
 *     tags: [Executor]
 *     parameters:
 *       - in: path
 *         name: executorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID исполнителя
 *         example: 42
 *     responses:
 *       200:
 *         description: Успешный запрос рейтинга
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rating:
 *                   type: number
 *                   format: float
 *                   description: Средний рейтинг (0-5)
 *                   example: 4.7
 *                 count:
 *                   type: integer
 *                   description: Количество отзывов
 *                   example: 15
 *       400:
 *         description: Неверный ID исполнителя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "ID исполнителя обязателен"
 *       404:
 *         description: Исполнитель не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
routerExecutor.get('/rating/:executorId', ExecutorController.getRating);

routerExecutor.get(
    '/me',
    authMiddleware,
    roleMiddleware(['EXECUTOR']),
    ExecutorController.getMe
);

export default routerExecutor;
