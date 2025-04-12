import {Router} from 'express';
import {createService} from '../controllers/createService.controller';
import {getService} from '../controllers/getService.controller';
import {updateService} from '../controllers/updateService.controller';
import {deleteService} from '../controllers/deleteService.controller';
import {checkRole} from '../../../core/middleware/checkRole';
import {Role} from '@prisma/client';
import {getServicesList} from '../controllers/getServicesList.controller';

export const serviceRouter = Router();

serviceRouter.post('/', checkRole(Role['ADMIN']), createService);

serviceRouter.get('/:id', getService);

serviceRouter.get('/', getServicesList);

serviceRouter.patch('/:id', checkRole(Role['ADMIN']), updateService);

serviceRouter.delete('/:id', checkRole(Role['ADMIN']), deleteService);
