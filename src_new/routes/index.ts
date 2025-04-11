import {Router} from 'express';
import {authRouter} from '../modules/auth/routes';
import {serviceRouter} from '../modules/service/routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter); // Авторизация / регистрация / подтверждение почты / смена пароля
apiRouter.use('/service', serviceRouter); // Создание / удаление / получение / обновление услуг
