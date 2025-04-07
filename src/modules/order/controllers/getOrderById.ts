import {Response} from 'express';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {getOrderById as getOrderByIdService} from '../services';

export async function getById(req: AuthRequest, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id);
        const order = await getOrderByIdService(id);

        if (!order) {
            res.status(404).json({message: 'Заказ не найден'});
            return;
        }

        res.json(order);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
