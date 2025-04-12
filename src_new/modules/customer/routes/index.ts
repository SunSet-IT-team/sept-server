import {Router} from 'express';
import {Role} from '@prisma/client';
import {checkRole} from '../../../core/middleware/checkRole';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {getCustomerProfile} from '../controllers/getCustomerProfile.controller';
import {updateCustomerProfile} from '../controllers/updateCustomerProfile.controller';
import {getCustomersList} from '../controllers/getCustomersProfileList.controller';
import {deleteCustomerProfile} from '../controllers/deleteCustomerProfile.controller';

const customerRouter = Router();

customerRouter.get('/me', checkRole(Role.EXECUTOR), getCustomerProfile);
customerRouter.patch('/me', checkRole(Role.EXECUTOR), updateCustomerProfile);

customerRouter.get('/list', authMiddleware, getCustomersList);

customerRouter.get('/:id', authMiddleware, getCustomerProfile);
customerRouter.patch('/:id', checkRole(Role.ADMIN), updateCustomerProfile);
customerRouter.delete('/:id', checkRole(Role.ADMIN), deleteCustomerProfile);

export default customerRouter;
