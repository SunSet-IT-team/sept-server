import {Router} from 'express';
import * as AuthController from './auth.controller';
import {validateDto} from '../../middleware/validate';
import {RegisterDTO} from './dto/register.dto';
import {LoginDTO} from './dto/login.dto';
import {authMiddleware} from '../../middleware/authMiddleware';

export const authRouter = Router();

authRouter.post('/register', validateDto(RegisterDTO), AuthController.register);
authRouter.post('/login', validateDto(LoginDTO), AuthController.login);
authRouter.get('/me', authMiddleware, AuthController.getMe);
