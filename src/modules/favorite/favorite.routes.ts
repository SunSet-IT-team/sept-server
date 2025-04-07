import {Router} from 'express';
import * as FavoriteController from './favorite.controller';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {FavoriteDTO} from './dto/favorite.dto';
import {validateParams} from '../../middleware/validateParams';

export const favoriteRouter = Router();

favoriteRouter.use(authMiddleware, roleMiddleware(['CUSTOMER']));

/**
 * @swagger
 * /favorites/{id}:
 *   post:
 *     summary: Добавить исполнителя в избранное
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID исполнителя
 *     responses:
 *       201:
 *         description: Исполнитель добавлен в избранное
 */
favoriteRouter.post(
    '/:id',
    validateParams('id', FavoriteDTO),
    FavoriteController.addFavorite
);

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Удалить исполнителя из избранного
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID исполнителя
 *     responses:
 *       200:
 *         description: Исполнитель удалён из избранного
 */
favoriteRouter.delete(
    '/:id',
    validateParams('id', FavoriteDTO),
    FavoriteController.removeFavorite
);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Получить список избранных исполнителей
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список избранного
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   city:
 *                     type: string
 */
favoriteRouter.get('/', FavoriteController.getFavorites);
