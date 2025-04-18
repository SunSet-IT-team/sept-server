import {Request, Response} from 'express';
import {getReviewsService} from '../services/getReviews.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';
import {GetReviewsParams} from '../services/getReviews.service';

export const getReviews = async (req: Request, res: Response) => {
    try {
        const {
            page: pageRaw,
            limit: limitRaw,
            sortBy,
            order: orderRaw,
            senderId: senderIdRaw,
            targetId: targetIdRaw,
        } = req.query;

        const page = pageRaw ? Number(pageRaw) : 1;
        const limit = limitRaw ? Number(limitRaw) : 10;
        const senderId = senderIdRaw ? Number(senderIdRaw) : undefined;
        const targetId = targetIdRaw ? Number(targetIdRaw) : undefined;

        const sortOrder: 'asc' | 'desc' = orderRaw === 'asc' ? 'asc' : 'desc';

        const params: GetReviewsParams = {
            page,
            limit,
            sortBy: sortBy?.toString(),
            order: sortOrder,
            senderId,
            targetId,
        };

        const result = await getReviewsService(params);
        return sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
