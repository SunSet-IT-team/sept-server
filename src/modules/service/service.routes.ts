import {Router} from 'express';
import * as ServiceController from './service.controller';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {validateDto} from '../../middleware/validate';
import {CreateServiceDTO} from './dto/createService.dto';
import {UpdatePriorityDTO} from './dto/updatePriority.dto';

export const serviceRouter = Router();

serviceRouter.get('/', authMiddleware, ServiceController.getServices);

serviceRouter.post(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateDto(CreateServiceDTO),
    ServiceController.createService
);

serviceRouter.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    ServiceController.deleteService
);

serviceRouter.patch(
    '/:id/priority',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateDto(UpdatePriorityDTO),
    ServiceController.updatePriority
);
