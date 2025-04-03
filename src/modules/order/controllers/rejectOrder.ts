import {Response} from 'express';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {rejectOrder as rejectOrderService} from '../services';

export async function rejectOrder(req: AuthRequest, res: Response) {
    try {
        const {id} = req.params;
        const executorId = req.user!.userId;

        const result = await rejectOrderService(Number(id), executorId);
        res.status(200).json({message: 'Заказ отклонён', result});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
