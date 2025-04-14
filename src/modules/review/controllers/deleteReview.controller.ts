import {Request, Response} from 'express';
import {deleteReviewService} from '../services/deleteReview.service';
import {
    successResponse,
    errorResponse,
    sendResponse,
} from '../../../core/utils/sendResponse';

export const deleteReview = async (req: Request, res: Response) => {
    try {
        const reviewId = Number(req.params.reviewId);
        const userId = Number(req.user?.id);
        const userRole = req.user?.role;

        if (!reviewId || !userId || !userRole) {
            return sendResponse(res, 400, errorResponse('Недостаточно данных'));
        }

        const result = await deleteReviewService({reviewId, userId, userRole});
        return sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
