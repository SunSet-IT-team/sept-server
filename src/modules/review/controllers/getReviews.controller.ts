import {Request, Response} from 'express';
import {getReviewsService} from '../services/getReviews.service';
import {
    successResponse,
    errorResponse,
    sendResponse,
} from '../../../core/utils/sendResponse';

export const getReviews = async (req: Request, res: Response) => {
    try {
        const {targetId} = req.params;
        if (!targetId) {
            return sendResponse(res, 400, errorResponse('Нет targetId'));
        }

        const reviews = await getReviewsService(targetId);
        return sendResponse(res, 200, successResponse(reviews));
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
