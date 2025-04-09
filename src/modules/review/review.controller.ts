import {Request, Response} from 'express';
import * as ReviewService from './review.service';
import {AuthRequest} from '../../middleware/authMiddleware';
import {getUserIdFromRequest} from '../../helpers/getUserByToken';

export async function createReview(req: AuthRequest, res: Response) {
    try {
        const result = await ReviewService.createReview(
            getUserIdFromRequest(req),
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
            getUserIdFromRequest(req),
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
        await ReviewService.deleteReview(getUserIdFromRequest(req), id);
        res.json({message: 'Отзыв удалён'});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
