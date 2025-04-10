import {Router} from 'express';

export const adminRouter = Router();

adminRouter.post('/login');
adminRouter.post('/recovery');
