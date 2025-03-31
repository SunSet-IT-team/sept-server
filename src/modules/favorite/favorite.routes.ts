import {Router} from 'express';
import * as FavoriteController from './favorite.controller';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {FavoriteDTO} from './dto/favorite.dto';
import {validateParams} from '../../middleware/validateParams';

export const favoriteRouter = Router();

favoriteRouter.use(authMiddleware, roleMiddleware(['CUSTOMER']));

favoriteRouter.post(
    '/:id',
    validateParams('id', FavoriteDTO),
    FavoriteController.addFavorite
);
favoriteRouter.delete(
    '/:id',
    validateParams('id', FavoriteDTO),
    FavoriteController.removeFavorite
);
favoriteRouter.get('/', FavoriteController.getFavorites);
