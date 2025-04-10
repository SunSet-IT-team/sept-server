import {Request, Response} from 'express';
import {acceptOrder as acceptOrderService} from '../services/acceptOrder';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {getUserIdFromRequest} from '../../../helpers/getUserByToken';

export async function acceptOrder(req: AuthRequest, res: Response) {
    try {
        const orderId = Number(req.params.id);
        const executorId = getUserIdFromRequest(req);

        const updatedOrder = await acceptOrderService(orderId, executorId);
        res.json(updatedOrder);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
