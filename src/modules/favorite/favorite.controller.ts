import {Response} from 'express';
import {AuthRequest} from '../../middleware/authMiddleware';
import * as FavoriteService from './favorite.service';

export async function addFavorite(req: AuthRequest, res: Response) {
    try {
        const executorId = Number(req.params.id);
        const result = await FavoriteService.addToFavorites(
            req.user!.userId,
            executorId
        );
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function removeFavorite(req: AuthRequest, res: Response) {
    try {
        const executorId = Number(req.params.id);
        await FavoriteService.removeFromFavorites(req.user!.userId, executorId);
        res.json({message: 'Удалено из избранного'});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function getFavorites(req: AuthRequest, res: Response) {
    try {
        const favorites = await FavoriteService.getFavorites(req.user!.userId);
        res.json(favorites.map((f) => f.executor));
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
