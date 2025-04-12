import {Router} from 'express';
import {authRouter} from '../modules/auth/routes';
import {serviceRouter} from '../modules/service/routes';
import fileRouter from '../modules/files/routes';
import executorRouter from '../modules/executor/routes';
import customerRouter from '../modules/customer/routes';
import orderRouter from '../modules/order/routes';
import {chatRouter} from '../modules/chat/router';
import {adminRouter} from '../modules/admin/routes';
import reviewRouter from '../modules/review/routes';
import favoriteRouter from '../modules/favorite/routes';
import {statsRouter} from '../modules/stats/routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter); // Авторизация / регистрация / подтверждение почты / смена пароля
apiRouter.use('/service', serviceRouter); // Создание / удаление / получение / обновление услуг
apiRouter.use('/files', fileRouter); // Защищённый доступ к файлам
apiRouter.use('/executor', executorRouter); // Работа с исполнителями
apiRouter.use('/customer', customerRouter); // Работа с заказчиками
apiRouter.use('/admin', adminRouter); // Работа с админами
apiRouter.use('/order', orderRouter); // Работа с заказами
apiRouter.use('/chat', chatRouter); // Работа с чатами
apiRouter.use('/review', reviewRouter); // Работа с отзывами
apiRouter.use('/favorite', favoriteRouter); // Работа с избранными
apiRouter.use('/admin', statsRouter); // Статистика
