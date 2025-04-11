import {Router} from 'express';
import {createService} from '../controllers/createService.controller';
import {getService} from '../controllers/getService.controller';
import {getAllServices} from '../controllers/getAllService.controller';
import {updateService} from '../controllers/updateService.controller';
import {deleteService} from '../controllers/deleteService.controller';
import {checkRole} from '../../../core/middleware/checkRole';
import {Role} from '@prisma/client';

export const serviceRouter = Router();

serviceRouter.post('/service', checkRole(Role['ADMIN']), createService);

serviceRouter.get('/service/:id', getService);

serviceRouter.get('/service', getAllServices);

serviceRouter.patch('/service/:id', checkRole(Role['ADMIN']), updateService);

serviceRouter.delete('/service/:id', checkRole(Role['ADMIN']), deleteService);
