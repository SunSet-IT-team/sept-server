import {Response} from 'express';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {createOrder as createOrderService} from '../services';

export async function createOrder(req: AuthRequest, res: Response) {
    try {
        const customerId = req.user!.userId;
        const order = await createOrderService({customerId, ...req.body});
        res.status(201).json(order);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
