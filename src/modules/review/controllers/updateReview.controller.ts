import {Request, Response} from 'express';
import {updateReviewService} from '../services/updateReview.service';
import {
    successResponse,
    errorResponse,
    sendResponse,
} from '../../../core/utils/sendResponse';

export const updateReview = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user?.id;
        const userRole = req.user?.role;
        if (!reviewId || !userId || !userRole) {
            return sendResponse(res, 400, errorResponse('Недостаточно данных'));
        }

        const {text, rating} = req.body;

        const updated = await updateReviewService({
            reviewId,
            text,
            rating,
            userId,
            userRole,
        });

        return sendResponse(res, 200, successResponse(updated));
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
