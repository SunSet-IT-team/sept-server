import {Router} from 'express';
import {Role} from '@prisma/client';
import {checkRole} from '../../../core/middleware/checkRole';
import {getExecutorProfile} from '../controllers/getExecutorProfile.controller';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {upload} from '../../../core/middleware/upload';
import {UpdateExecutorDTO} from '../dtos/updateExecutorProfile.dto';
import {validateDto} from '../../../core/utils/validateDto';
import {updateExecutorProfile} from '../controllers/updateExecutorProfile.controller';
import {deleteExecutorProfile} from '../controllers/deleteExecutor.controller';
import {getExecutorsList} from '../controllers/getExecutorsList.controller';

const executorRouter = Router();

executorRouter.get('/me', checkRole(Role.EXECUTOR), getExecutorProfile); // Получить свой профиль
executorRouter.patch(
    '/me',
    checkRole(Role.EXECUTOR),
    upload.fields([
        {name: 'profilePhoto', maxCount: 1},
        {name: 'registrationDoc', maxCount: 5},
        {name: 'licenseDoc', maxCount: 5},
    ]),
    validateDto(UpdateExecutorDTO),
    updateExecutorProfile
); // Обновить свой профиль

executorRouter.delete('/:id', checkRole(Role.ADMIN), deleteExecutorProfile);
executorRouter.patch(
    '/:id',
    checkRole(Role.ADMIN),
    upload.fields([
        {name: 'profilePhoto', maxCount: 1},
        {name: 'registrationDoc', maxCount: 5},
        {name: 'licenseDoc', maxCount: 5},
    ]),
    validateDto(UpdateExecutorDTO),
    updateExecutorProfile
); // Обнвоить профиль по id

executorRouter.get('/:id', authMiddleware, getExecutorProfile); // Получить профиль по id
executorRouter.get('/', authMiddleware, getExecutorsList); // Получить исполнителей с пагинацией и фильтрами
// executorRouter.get('/:executorId/order', checkRole(Role.EXECUTOR), () => {});

// executorRouter.get('/:executorId/rating', checkRole(Role.EXECUTOR), () => {});

export default executorRouter;
