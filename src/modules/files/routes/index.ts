import {Router} from 'express';
import path from 'path';
import fs from 'fs';
import {prisma} from '../../../core/database/prisma';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {getProtectedFileController} from '../controllers/getProtectedFile.controller';
import {uploadFiles} from '../controllers/uploadFile.controller';
import {upload} from '../../../core/middleware/upload';

const fileRouter = Router();

fileRouter.get('/:filename', getProtectedFileController);
fileRouter.post(
    '/upload',
    authMiddleware,
    upload.array('files', 10),
    uploadFiles
);

export default fileRouter;
