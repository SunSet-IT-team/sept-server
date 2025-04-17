/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Управление заказами
 */

/* -------------------------------------------------------------------------- */
/*                                 POST /order                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Создать заказ
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - objectType
 *               - distanceToSeptic
 *               - septicDepth
 *               - septicVolume
 *               - septicConstructionType
 *               - paymentMethod
 *               - workDate
 *               - city
 *               - address
 *               - serviceId
 *               - executorId
 *             properties:
 *               title:                    { type: string, example: Откачка септика }
 *               objectType:               { type: string, example: Жилой дом }
 *               comment:                  { type: string, example: Нужно приехать до обеда }
 *               distanceToSeptic:         { type: number, example: 15.5 }
 *               septicDepth:              { type: number, example: 3.2 }
 *               septicVolume:             { type: number, example: 5 }
 *               septicConstructionType:   { type: string, example: Бетонные кольца }
 *               paymentMethod:            { type: string, example: Наличные }
 *               workDate:                 { type: string, format: date-time, example: 2024‑08‑01T09:00:00.000Z }
 *               city:                     { type: string, example: Москва }
 *               address:                  { type: string, example: Москва, ул. Пушкина, д. 10 }
 *               serviceId:                { type: integer, example: 3 }
 *               executorId:               { type: integer, example: 7 }
 *               price:                    { type: number, example: 25000 }
 *     responses:
 *       201: { description: Заказ успешно создан }
 *       400: { description: Ошибка валидации входных данных }
 *       401: { description: Неавторизован }
 */

/* -------------------------------------------------------------------------- */
/*                            GET /order (админ)                              */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order:
 *   get:
 *     summary: Получить список заказов (админ)
 *     description: Пагинация, сортировка по любому полю и гибкая фильтрация
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Номер страницы
 *         schema:  { type: integer, default: 1, minimum: 1 }
 *       - in: query
 *         name: limit
 *         description: Кол‑во элементов на страницу
 *         schema:  { type: integer, default: 10, minimum: 1 }
 *       - in: query
 *         name: sortBy
 *         description: Любое поле Order (title, price, city, priority, createdAt …)
 *         schema:  { type: string }
 *       - in: query
 *         name: order
 *         description: Направление сортировки
 *         schema:  { type: string, enum: [asc, desc], default: desc }
 *       - in: query
 *         name: status
 *         schema:  { type: string, enum: [PENDING, IN_PROGRESS, COMPLETED, REJECTED, CANCELLED] }
 *       - in: query
 *         name: executorId
 *         schema:  { type: integer }
 *       - in: query
 *         name: customerId
 *         schema:  { type: integer }
 *       - in: query
 *         name: city
 *         schema:  { type: string }
 *       - in: query
 *         name: priceFrom
 *         schema:  { type: number }
 *       - in: query
 *         name: priceTo
 *         schema:  { type: number }
 *       - in: query
 *         name: createdFrom
 *         description: Дата «с»
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: createdTo
 *         description: Дата «по»
 *         schema: { type: string, format: date }
 *     responses:
 *       200: { description: Список заказов }
 *       403: { description: Нет доступа }
 */

/* -------------------------------------------------------------------------- */
/*                       GET /order/executor/{executorId}                     */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order/executor/{executorId}:
 *   get:
 *     summary: Получить заказы конкретного исполнителя (админ)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: executorId
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [PENDING, IN_PROGRESS, COMPLETED, REJECTED, CANCELLED] }
 *     responses:
 *       200: { description: Список заказов }
 *       403: { description: Нет доступа }
 */

/* -------------------------------------------------------------------------- */
/*                       GET /order/customer/{customerId}                     */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order/customer/{customerId}:
 *   get:
 *     summary: Получить заказы конкретного заказчика (админ)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: customerId
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [PENDING, IN_PROGRESS, COMPLETED, REJECTED, CANCELLED] }
 *     responses:
 *       200: { description: Список заказов }
 *       403: { description: Нет доступа }
 */

/* -------------------------------------------------------------------------- */
/*                        GET /order/my (исп/заказчик)                        */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order/my:
 *   get:
 *     summary: Получить свои заказы (исполнитель или заказчик)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [PENDING, IN_PROGRESS, COMPLETED, REJECTED, CANCELLED] }
 *     responses:
 *       200: { description: Список заказов }
 */

/* -------------------------------------------------------------------------- */
/*                       PATCH /order/{id}  (владелец)                        */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order/{id}:
 *   patch:
 *     summary: Обновить заказ
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:        { type: string }
 *               paymentMethod:  { type: string }
 *               workDate:       { type: string, format: date-time }
 *               price:          { type: number }
 *               status:         { type: string, enum: [CANCELLED] }
 *     responses:
 *       200: { description: Заказ обновлён }
 *       403: { description: Нет прав }
 */

/* -------------------------------------------------------------------------- */
/*                        DELETE /order/{id} (владелец)                       */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Удалить заказ
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Заказ удалён }
 *       404: { description: Заказ не найден }
 */

/* -------------------------------------------------------------------------- */
/*                       POST /order/{id}/accept|reject                       */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order/{id}/accept:
 *   post:
 *     summary: Принять заказ (исполнитель)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Заказ принят }
 *       403: { description: Нет доступа }
 *
 * /order/{id}/reject:
 *   post:
 *     summary: Отклонить заказ (исполнитель)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Заказ отклонён }
 *       403: { description: Нет доступа }
 */

/* -------------------------------------------------------------------------- */
/*                      POST /order/{id}/complete (exec)                      */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /order/{id}/complete:
 *   post:
 *     summary: Завершить заказ и прикрепить отчёт
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [total]
 *             properties:
 *               total:
 *                 type: number
 *                 description: Итоговая сумма работ
 *                 example: 15000
 *               reportFiles:
 *                 type: array
 *                 description: Файлы‑подтверждения
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200: { description: Заказ завершён, отчёт создан }
 *       400: { description: Неверный статус заказа }
 *       403: { description: Нет прав }
 *       404: { description: Заказ не найден }
 */
