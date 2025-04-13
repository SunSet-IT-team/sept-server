// routes/executor.routes.ts
import {Router} from 'express';
import {Role} from '@prisma/client';
import {checkRole} from '../../../core/middleware/checkRole';
import {getFavorites} from '../controllers/getFavorites.controller';
import {toggleFavorite} from '../controllers/toggleFavorite.controller';

const favoriteRouter = Router();

favoriteRouter.post('/:executorId', checkRole(Role.CUSTOMER), toggleFavorite);

favoriteRouter.get('/', checkRole(Role.CUSTOMER), getFavorites);

export default favoriteRouter;
