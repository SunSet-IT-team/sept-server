import {Router} from 'express';
import {validateDto} from '../../middleware/validate';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import * as AdminController from './admin.controller';
import {LoginAdminDTO} from './dto/loginAdmin.dto';

export const adminRouter = Router();

adminRouter.post('/login', validateDto(LoginAdminDTO), AdminController.login);
