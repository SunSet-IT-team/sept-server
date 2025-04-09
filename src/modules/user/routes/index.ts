import {Router} from 'express';
import {adminRouter} from './admin.routes';

export const userRouter = Router();

userRouter.use('/admin', adminRouter);
userRouter.use('/customer');
userRouter.use('/executor');
