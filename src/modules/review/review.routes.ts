import {Router} from 'express';
import * as ReviewController from './review.controller';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {validateDto} from '../../middleware/validate';
import {CreateReviewDTO} from './dto/createReview.dto';
import {UpdateReviewDTO} from './dto/updateReview.dto';

export const reviewRouter = Router();

reviewRouter.use(authMiddleware, roleMiddleware(['CUSTOMER']));

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Оставить отзыв
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - rating
 *               - comment
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 12
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: Всё отлично, спасибо!
 *     responses:
 *       201:
 *         description: Отзыв создан
 */
reviewRouter.post(
    '/',
    validateDto(CreateReviewDTO),
    ReviewController.createReview
);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Обновить отзыв
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Всё супер!
 *     responses:
 *       200:
 *         description: Отзыв обновлён
 */
reviewRouter.put(
    '/:id',
    validateDto(UpdateReviewDTO),
    ReviewController.updateReview
);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Удалить отзыв
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Отзыв удалён
 */
reviewRouter.delete('/:id', ReviewController.deleteReview);
