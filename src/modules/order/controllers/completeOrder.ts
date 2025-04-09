import {Response} from 'express';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {completeOrder as completeOrderService} from '../services';
import {getUserIdFromRequest} from '../../../helpers/getUserByToken';

export async function completeOrder(req: AuthRequest, res: Response) {
    try {
        const {id} = req.params;
        const executorId = getUserIdFromRequest(req);
        const {report} = req.body;

        const updated = await completeOrderService(
            Number(id),
            executorId,
            report
        );
        res.json(updated);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
