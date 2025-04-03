// src/modules/routes/index.ts

import {Router} from 'express';

import {customerRouter} from '../modules/customer/customer.routes'; // Заказчики
import routerExecutor from '../modules/executor/executor.routes'; // Исполнители
import {serviceRouter} from '../modules/service/service.routes'; // Услуги
import {orderRouter} from '../modules/order/order.routes'; // Заказы
import {favoriteRouter} from '../modules/favorite/favorite.routes'; // Избранное
import {reviewRouter} from '../modules/review/review.routes';

const apiRouter = Router();

apiRouter.use('/customer', customerRouter);
apiRouter.use('/executor', routerExecutor);

apiRouter.use('/services', serviceRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/favorites', favoriteRouter);
apiRouter.use('/reviews', reviewRouter);

export {apiRouter};
