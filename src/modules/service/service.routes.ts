import {Router} from 'express';
import * as ServiceController from './service.controller';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {validateDto} from '../../middleware/validate';
import {CreateServiceDTO} from './dto/createService.dto';
import {UpdatePriorityDTO} from './dto/updatePriority.dto';

export const serviceRouter = Router();

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Получить список всех услуг
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список услуг
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
 *                   priority:
 *                     type: integer
 */
serviceRouter.get('/', authMiddleware, ServiceController.getServices);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Создать новую услугу (только для администратора)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Откачка септика
 *     responses:
 *       201:
 *         description: Услуга создана
 */
serviceRouter.post(
    '/create',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateDto(CreateServiceDTO),
    ServiceController.createService
);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Удалить услугу (только для администратора)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Услуга удалена
 */
serviceRouter.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    ServiceController.deleteService
);

/**
 * @swagger
 * /services/{id}/priority:
 *   patch:
 *     summary: Изменить приоритет услуги (только для администратора)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - priority
 *             properties:
 *               priority:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Приоритет обновлён
 */
serviceRouter.patch(
    '/:id/priority',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateDto(UpdatePriorityDTO),
    ServiceController.updatePriority
);
