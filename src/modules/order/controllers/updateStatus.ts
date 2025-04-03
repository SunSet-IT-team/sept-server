import {Response} from 'express';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {updateOrderStatus as updateOrderStatusService} from '../services';

export async function updateStatus(req: AuthRequest, res: Response) {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const executorId = req.user!.userId;

        const updated = await updateOrderStatusService(
            Number(id),
            executorId,
            status
        );
        res.json(updated);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
