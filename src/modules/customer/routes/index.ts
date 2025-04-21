import {Router} from 'express';
import {Role} from '@prisma/client';
import {checkRole} from '../../../core/middleware/checkRole';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {getCustomerProfile} from '../controllers/getCustomerProfile.controller';
import {updateCustomerProfile} from '../controllers/updateCustomerProfile.controller';
import {getCustomersList} from '../controllers/getCustomersProfileList.controller';
import {deleteCustomerProfile} from '../controllers/deleteCustomerProfile.controller';
import {validateDto} from '../../../core/utils/validateDto';
import {CreateAddressDTO} from '../dtos/createAddress.dto';
import {createAddress} from '../controllers/createAddress.controller';
import {getCustomerStats} from '../controllers/getCustomerStats.controller';
import {getMyStats} from '../controllers/getMyStats.controller';
import {upload} from '../../../core/middleware/upload';
import {UpdateCustomerDTO} from '../dtos/updateCustomerProfile.dto';

const customerRouter = Router();

customerRouter.get('/me', checkRole(Role.CUSTOMER), getCustomerProfile);
customerRouter.patch(
    '/me',
    checkRole(Role.CUSTOMER),
    upload.fields([{name: 'profilePhoto', maxCount: 1}]),
    // validateDto(UpdateCustomerDTO),
    updateCustomerProfile
);

customerRouter.get('/list', authMiddleware, getCustomersList);

customerRouter.get('/:id', authMiddleware, getCustomerProfile);
customerRouter.patch('/:id', checkRole(Role.ADMIN), updateCustomerProfile);
customerRouter.delete('/:id', checkRole(Role.ADMIN), deleteCustomerProfile);

customerRouter.post(
    '/address',
    checkRole(Role.CUSTOMER),
    validateDto(CreateAddressDTO),
    createAddress
);

customerRouter.get('/me/stats', authMiddleware, getMyStats);
customerRouter.get('/:id/stats', authMiddleware, getCustomerStats);

export default customerRouter;
