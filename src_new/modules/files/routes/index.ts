import {Router} from 'express';
import path from 'path';
import fs from 'fs';
import {prisma} from '../../../core/database/prisma';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {getProtectedFileController} from '../controllers/getProtectedFile.controller';

const fileRouter = Router();

fileRouter.get('/:filename', authMiddleware, getProtectedFileController);

export default fileRouter;
