// src/modules/routes/index.ts

import {Router} from 'express';

import {userRouter} from '../modules/user/user.routes'; // Пользователи
import {authRouter} from '../modules/auth/auth.routes'; // Авторизация
import {serviceRouter} from '../modules/service/service.routes'; // Услуги
import {orderRouter} from '../modules/order/order.routes'; // Заказы
import {favoriteRouter} from '../modules/favorite/favorite.routes'; // Избранное

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/services', serviceRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/favorites', favoriteRouter);

export {apiRouter};
