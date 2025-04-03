import {Response} from 'express';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {getAvailable as getAvailableOrdersService} from '../services';

export async function getAvailableOrders(req: AuthRequest, res: Response) {
    try {
        const executorId = req.user!.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const orders = await getAvailableOrdersService(executorId, page, limit);
        res.json(orders);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
