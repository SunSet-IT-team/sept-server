import {Router} from 'express';
import {authRouter} from '../modules/auth/routes';
import {serviceRouter} from '../modules/service/routes';
import fileRouter from '../modules/files/routes';
import executorRouter from '../modules/executor/routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter); // Авторизация / регистрация / подтверждение почты / смена пароля
apiRouter.use('/service', serviceRouter); // Создание / удаление / получение / обновление услуг
apiRouter.use('/files', fileRouter); // Защищённый доступ к файлам
apiRouter.use('/executor', executorRouter);
