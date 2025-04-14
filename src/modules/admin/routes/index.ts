import {Router} from 'express';
import {checkRole} from '../../../core/middleware/checkRole';
import {Role} from '@prisma/client';
import {validateDto} from '../../../core/utils/validateDto';
import {UpdateAdminDTO} from '../dtos/updateAdmin.dto';
import {getAdminProfile} from '../controllers/getAdminProfile.controller';
import {updateAdminProfile} from '../controllers/updateAdminProfile.controller';
import {updateUserPriorityController} from '../controllers/updateUserPriority.controller';
import {UpdateUserPriorityDto} from '../dtos/updatePriority.dto';

export const adminRouter = Router();

adminRouter.get('/me', checkRole(Role.ADMIN), getAdminProfile);
adminRouter.patch(
    '/me',
    checkRole(Role.ADMIN),
    validateDto(UpdateAdminDTO),
    updateAdminProfile
);

adminRouter.put(
    '/users/:userId/priority',
    checkRole(Role.ADMIN),
    validateDto(UpdateUserPriorityDto),
    updateUserPriorityController
);
