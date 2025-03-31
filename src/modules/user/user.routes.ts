// src/modules/user/user.routes.ts
import {Router} from 'express';
import * as UserController from './user.controller';
import {validateDto} from '../../middleware/validate';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {UpdateUserDTO} from './dto/updateUser.dto';

export const userRouter = Router();

userRouter.use(authMiddleware, roleMiddleware(['ADMIN']));

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

userRouter.put('/me', validateDto(UpdateUserDTO), UserController.updateMe);
