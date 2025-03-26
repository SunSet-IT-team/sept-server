import { Router } from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "./user.controller";
import { validateDto } from "../../middleware/validate";
import { CreateUserDTO } from "./dto/createUser.dto";

export const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями (исполнители, заказчики, админ)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 */
userRouter.get("/", getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Не найден
 */
userRouter.get("/:id", getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 enum: [ADMIN, CUSTOMER, EXECUTOR]
 *                 example: CUSTOMER
 *               city:
 *                 type: string
 *                 example: Москва
 *               address:
 *                 type: string
 *                 example: "Улица Ленина, дом 1"
 *     responses:
 *       201:
 *         description: Пользователь создан
 *       400:
 *         description: Ошибка валидации
 */
userRouter.post("/", validateDto(CreateUserDTO), createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Обновить пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               city: { type: string }
 *               address: { type: string }
 *     responses:
 *       200:
 *         description: Обновлено
 *       404:
 *         description: Не найден
 */
userRouter.put("/:id", updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Удалено
 */
userRouter.delete("/:id", deleteUser);
