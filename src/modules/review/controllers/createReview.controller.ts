// controllers/createReview.controller.ts
import {Request, Response} from 'express';
import {createReviewService} from '../services/createReview.service';
import {
    successResponse,
    errorResponse,
    sendResponse,
} from '../../../core/utils/sendResponse';

export const createReview = async (req: Request, res: Response) => {
    try {
        const authorId = req.user?.id;
        const {orderId} = req.params;
        const {text, rating} = req.body;

        if (!authorId) {
            return sendResponse(res, 401, errorResponse('Не авторизован'));
        }
        if (!text || !rating) {
            return sendResponse(
                res,
                400,
                errorResponse('Необходимо передать text и rating')
            );
        }

        const review = await createReviewService({
            orderId,
            text,
            rating: Number(rating),
            authorId,
        });

        return sendResponse(res, 201, successResponse(review));
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
