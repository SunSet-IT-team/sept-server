import {Router} from 'express';
import {getStatistics} from '../controllers/getStatistics.controller';
import {checkRole} from '../../../core/middleware/checkRole';
import {Role} from '@prisma/client';

export const statsRouter = Router();

statsRouter.get('/stats', checkRole(Role.ADMIN), getStatistics);
