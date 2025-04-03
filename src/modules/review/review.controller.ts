import {Request, Response} from 'express';
import * as ReviewService from './review.service';
import {AuthRequest} from '../../middleware/authMiddleware';

export async function createReview(req: AuthRequest, res: Response) {
    try {
        const result = await ReviewService.createReview(
            req.user!.userId,
            req.body
        );
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function updateReview(req: AuthRequest, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await ReviewService.updateReview(
            req.user!.userId,
            id,
            req.body
        );
        res.json(result);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function deleteReview(req: AuthRequest, res: Response) {
    try {
        const id = Number(req.params.id);
        await ReviewService.deleteReview(req.user!.userId, id);
        res.json({message: 'Отзыв удалён'});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
